// axios
import axios from 'axios'
import router from '../router'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://api.moboeats.test/api/v1/' : 'https://guardnow.delivery-api.amaniaccess.com/api/v1'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

//  Set the AUTH token for any request
axiosIns.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
  }
  return config;
});

//Intercept every response to check for errors
axiosIns.interceptors.response.use(null, (error) => {
  switch(error.response.status) {
      // case 400:
      //     console.error(error.response.status, error.message);
      //     Vue.$toast.open({
      //         message: 'Unable to process the request. Kindly check your data',
      //         type: 'error',
      //         position: "top-right",
      //         duration: 6000
      //         // all other options may go here
      //     });
      //     break;

      case 401: // authentication error, logout the user
          // Vue.$toast.open({
          //     message: 'Authentication error / Unauthorized',
          //     type: 'error',
          //     position: "top-right",
          //     duration: 4000
          //     // all other options may go here
          // });
          // //destroy token, cause user may have faked role in local storage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push('/signin');
          break;

      default:
          console.error(error.response.status, error.message);
          // notify.error('Server Error');

  }
return Promise.reject(error);
});

export default axiosIns
