// axios
import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://moboeats.test/api' : 'https://moboeats.com/api'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export default axiosIns