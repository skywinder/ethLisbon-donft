const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { getCreate2Address } = require('@ethersproject/address')
const { keccak256 } = require('@ethersproject/solidity')
const { loadFixture } = waffle;

const SALT = '0x0000000000000000000000000000000000000000000000000000000000001337'
const GAS_PRICE = 1e9

// eip-2470
const eipDeployer = {
  tx: '0xf9016c8085174876e8008303c4d88080b90154608060405234801561001057600080fd5b50610134806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80634af63f0214602d575b600080fd5b60cf60048036036040811015604157600080fd5b810190602081018135640100000000811115605b57600080fd5b820183602082011115606c57600080fd5b80359060200191846001830284011164010000000083111715608d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550509135925060eb915050565b604080516001600160a01b039092168252519081900360200190f35b6000818351602085016000f5939250505056fea26469706673582212206b44f8a82cb6b156bfcc3dc6aadd6df4eefd204bc928a4397fd15dacf6d5320564736f6c634300060200331b83247000822470',
  from: '0xBb6e024b9cFFACB947A71991E386681B1Cd1477D', // needs to have 0.0247 ETH
  expectedAddress: '0xce0042B868300000d44A59004Da54A005ffdcf9f',
}

describe("Proxy", function () {
  this.timeout(20000)

  async function deployEIP2470Proxy() {
    const [admin] = await ethers.getSigners()
    await admin.sendTransaction({
      to: eipDeployer.from,
      value: ethers.utils.parseEther('0.0247').toHexString(),
      gasLimit: ethers.BigNumber.from(21000).toHexString(),
      gasPrice: GAS_PRICE,
    })
    await ethers.provider.sendTransaction(eipDeployer.tx)
    const code = await ethers.provider.getCode(eipDeployer.expectedAddress)
    expect(code.startsWith('0x60806040')).to.be.true
  }

  async function deploy(contractName, ...args) {
    const Factory = await ethers.getContractFactory(contractName)
    const instance = await Factory.deploy(...args)
    return instance.deployed()
  }

  async function getProxyAddressFor(tokenAddress, tokenId) {
    const proxy = await ethers.getContractFactory("Proxy")
    const bytecode = proxy.getDeployTransaction(tokenAddress, tokenId).data
    const initHash = keccak256(['bytes'], [bytecode])
    return getCreate2Address(eipDeployer.expectedAddress, SALT, initHash)
  }

  async function deployProxyFor(tokenAddress, tokenId) {
    const proxy = await ethers.getContractFactory("Proxy")
    const bytecode = proxy.getDeployTransaction(tokenAddress, tokenId).data
    const Factory = await ethers.getContractFactory("SingletonFactory")
    const factory = await Factory.attach(eipDeployer.expectedAddress)
    await factory.deploy(bytecode, SALT)
    const expectedAddress = await getProxyAddressFor(tokenAddress, tokenId)
    return proxy.attach(expectedAddress)
  }

  async function fixture() {
    await deployEIP2470Proxy()
    const parentNFT = await deploy("ERC721Mock")
    const childNFT = await deploy("ERC721Mock")
    return { parentNFT, childNFT }
  }

  it("Should work", async function () {
    const [admin, alice, bob, charlie] = await ethers.getSigners()
    const { parentNFT, childNFT } = await loadFixture(fixture)

    const parentTokenId = 1337
    const childTokenId = 42

    const ownerToken = await parentNFT.mint(alice.address, parentTokenId)
    const childToken = await childNFT.mint(alice.address, childTokenId)

    const proxyAddress = await getProxyAddressFor(parentNFT.address, parentTokenId)
    await childNFT.connect(alice).transferFrom(alice.address, proxyAddress, childTokenId)
    await parentNFT.connect(alice).transferFrom(alice.address, bob.address, parentTokenId)

    const proxyContract = await deployProxyFor(parentNFT.address, parentTokenId)
    const transferCalldata = await childNFT.populateTransaction.transferFrom(proxyAddress, charlie.address, childTokenId)
    await proxyContract.connect(bob).call(childNFT.address, transferCalldata.data)
    expect(await childNFT.ownerOf(childTokenId)).to.equal(charlie.address)
  })
})
