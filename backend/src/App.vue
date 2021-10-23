<template>
  <div id="app">
    <div id="forecast">
      <snow v-if="weather === 'snow'"/>
      <vue-firework v-if="weather === 'fireworks'"/>
    </div>
    <div class="container">
      <navigation/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import './assets/main.scss'
import Navigation from "@/components/Navigation";
import VueFirework from 'vue-firework'
import Snow from 'vue-niege'
import router from './router'

export default {
  name: 'App',
  components: {Navigation, Snow, VueFirework},
  data: function () {
    return {
      weather: ''
    }
  },
  created() {
    let currInput = ''
    let forecast = new Map;
    forecast.set("snow", {"type": "snow", "alertMsg": ""})
    forecast.set("fire", {"type": "fireworks", "alertMsg": "Кликайте по экрану!"})
    forecast.set("end", {"type": "", "alertMsg": ""})
    window.addEventListener("keydown", (e) => {
      if (router.currentRoute.name !== 'Home') {
        currInput = ''
        return
      }
      currInput += e.key
      let foundSmth = false
      forecast.forEach((value, key) => {
        if (key === currInput) {
          this.weather = value.type
          const alertMsg = value.alertMsg
          if (alertMsg !== '') {
            alert(alertMsg)
          }
          return
        }
        if (key.startsWith(currInput)) {
          foundSmth = true
        }
      })
      if (!foundSmth) {
        currInput = ''
      }
    })
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
