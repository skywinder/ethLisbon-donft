import axios from "axios"

const API_URL = 'http://127.0.0.1:5000/api/'

export async function fetchSuggestions(text) {
    return axios.post(API_URL + "get_suggestions", {text: text})
}

// const mockSuggestions = [
//     {suggestions: ["hello", "world", "bye"]},
//     {suggestions: ["blah", "blah"]},
//     {suggestions: ["her", "words", "are"]}
// ]
//
// export async function fetchSuggestions(text) {
//     console.log(text)
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let suggestions = mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)]
//             if (suggestions) {
//                 resolve({data: suggestions})
//             } else {
//                 reject(Error('Survey does not exist'))
//             }
//         }, 300)
//     })
// }