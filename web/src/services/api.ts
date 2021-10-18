import axios, { AxiosError } from 'axios'
import { setCookie, parseCookies } from 'nookies'

import { signOut } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let failedRequestsQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)
  
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@dashgo.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if(error.response.status === 401) {
      if(error.response.data?.code === 'token.expired') {
        cookies = parseCookies()
  
        const { '@dashgo.refreshToken': refreshToken } = cookies
        const originalConfig = error.config
  
        if(!isRefreshing) {
          isRefreshing = true
  
          api.post('/sessions/refresh', {
            refreshToken: JSON.parse(refreshToken).id
          }).then(response => {
            const { token } = response.data
    
            setCookie(ctx, '@dashgo.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            })
      
            setCookie(ctx, '@dashgo.refreshToken',
             response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            })
    
            api.defaults.headers['Authorization'] = `Bearer ${token}}`
  
            failedRequestsQueue.forEach(request => request.onSuccess(token))
            failedRequestsQueue = []
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err))
            failedRequestsQueue = []
  
            if(process.browser) {
              signOut()
            }
          }).finally(() => {
            isRefreshing = false
          })
        }
  
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              api.defaults.headers['Authorization'] = `Bearer ${token}}`
  
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      } else {
        if(process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }
  
    return Promise.reject(error)
  })

  return api
}