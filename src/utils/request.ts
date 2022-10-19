import { getCommonParams } from '@/config/commonParams'
import env from '@/config/env'
import { hideLoading, showLoading } from '@/config/serviceLoading'

import { isDevelopment, isH5 } from './platform'
import { forward } from './router'
import user from '@/store/user'
function reject(err: { errno: number; errmsg: string }) {
  const { errmsg = '抢购火爆，稍候片刻！', errno = -1 } = err
  switch (errno) {
    case 10000:
      // 特殊异常处理
      forward('login')
      break

    default:
      uni.showToast({
        title: errmsg+'request reject',
      })
      break
  }
}

// h5环境开启代理
// const apiBaseUrl = isH5 && isDevelopment ? '/api' : env.apiBaseUrl
const apiBaseUrl = isH5 && isDevelopment ? '/api' : ''
function baseRequest(method:any, url: string, data:any,header?:any) {
  return new Promise((resolve) => {
	  console.log('showLoading,request')
    const user_store = user()
    showLoading(data.isLoading+'request')
    delete data.isLoading
    let responseDate
    uni.request({
      url: apiBaseUrl + url,
      method:method === 'FORM'?'POST':method,
      timeout: 20000,
      header: header||{
        'content-type':
          method === 'POST'
            ? 'application/json; charset=utf-8'
            : method === 'FORM'
            ?'application/x-www-form-urlencoded'
            :'application/json; charset=utf-8',
            'C-User-ticket':'c36dcb8282904ca1bc7f037a3c871f16',
            'C-Client-id':user_store.id
      },
      data,
      success: (res: any) => {
        console.log(res,'success res')
        // if (res.data.status === 200 ) {
            responseDate = res.data
        // } else {
        //   reject(res.data)
        // }
      },
      fail: (err) => {
        reject({
          errno: -1,
          errmsg: '网络不给力，请检查你的网络设置~',
        })
      },
      complete: (data) => {
        console.log(data, 'data')
        resolve(data.data)
        hideLoading()
      },
    })
  })
}

const http = {
  get: <T>(api, params,header?:any) =>
  baseRequest('GET', api, {  ...params },header) as Http.Response<T>,
    // baseRequest('GET', api, { ...getCommonParams(), ...params },header) as Http.Response<T>,
  post: <T>(api, params,header?:any) =>
  baseRequest('POST', api, {  ...params },header) as Http.Response<T>,
    // baseRequest('POST', api, { ...getCommonParams(), ...params },header) as Http.Response<T>,
    form: <T>(api, params,header?:any) =>
    baseRequest('FORM', api, {  ...params },header) as Http.Response<T>,
}

export default http
