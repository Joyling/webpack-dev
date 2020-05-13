import axios from 'axios';
import responseSuccess from './interceptors/responseSuccess'
import responseFail from './interceptors/responseFail'
import requestSuccess from './interceptors/requestSuccess'
import requestFail from './interceptors/requestFail'

const api = axios.create({
  baseURL: "http://www.phonegap100.com/",
  timeout: 1000
});
api.interceptors.response.use(responseSuccess, responseFail);
api.interceptors.request.use(requestSuccess, requestFail);


export default api;