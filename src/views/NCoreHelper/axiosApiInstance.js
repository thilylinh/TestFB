import axios from 'axios'
import Vue from 'vue'
import NCoreConfig from "./NCoreConfig";

// eslint-disable-next-line import/prefer-default-export
export const axiosApiInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json, multipart/form-data',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})
axiosApiInstance.interceptors.request.use(
  config => {
    // Get token from localStorage
    const accessToken = localStorage.getItem(NCoreConfig.storageTokenKeyName)
    // localStorage.getItem('token')
    // const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)
    // If token is present add it to request's Authorization Header
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${accessToken}`
    }
    return config
  },
  error => Promise.reject(error),
)

// Add request/response interceptor
axiosApiInstance.interceptors.response.use(
  response => response,
  error => {
    // const { config, response: { status } } = error
    let accessToken = ''
    const {
      config,
      response,
    } = error
    const originalRequest = config

    // if (status === 401) {
    if (response && response.status === 401) {
      if (!NCoreConfig.isAlreadyFetchingAccessToken) {
        NCoreConfig.isAlreadyFetchingAccessToken = true
        axiosApiInstance.post(NCoreConfig.refreshEndpoint, {
          refreshToken: localStorage.getItem(NCoreConfig.storageRefreshTokenKeyName),
          accessToken: localStorage.getItem(NCoreConfig.storageTokenKeyName),
        })
          .then(r => {
            NCoreConfig.isAlreadyFetchingAccessToken = false
            switch (r.data.code) {
              case 200: {
                localStorage.setItem(NCoreConfig.storageTokenKeyName, `Bearer ${r.data.accessToken}`)
                localStorage.setItem(NCoreConfig.storageRefreshTokenKeyName, r.data.refreshToken)
                accessToken = r.data.accessToken
                break
              }
              case 400: {
                // Hết hạn token => chuyển về trang login
                localStorage.clear()
                window.location = '/user/login'
                break
              }
              default: {
                this.$router.push({name: 'login'})
                break
              }
            }
          })
      }
      return new Promise(resolve => {
        originalRequest.headers.Authorization = `${NCoreConfig.tokenType} ${accessToken}`
        resolve(axiosApiInstance(originalRequest))
      })
    }
    return Promise.reject(error)
  },
)

Vue.prototype.$http = axiosApiInstance
