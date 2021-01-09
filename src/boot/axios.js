import axios from 'axios'
export default ({ Vue }) => {
  let baseURL = 'http://localhost:4000/';
  Vue.prototype.$axios = axios.create({
    baseURL
  })
}

