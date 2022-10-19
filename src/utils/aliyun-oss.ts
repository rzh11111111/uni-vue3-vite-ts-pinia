// import axios from 'axios'
// import { Message } from 'element-ui'
import http from '@/utils/request'
import env from '@/config/env'

export function upload(opt, file, fname) {
  var config = opt || false,
    file = file || false,
    fname = fname || false
  console.log(config, 'config')
  return new Promise((resolve, reject) => {
    var formData = new window.FormData()
    console.log(formData, 'formData')
    formData.append('key', config.dir + '/' + (!fname ? file.name : fname))
    formData.append('OSSAccessKeyId', config.accessid)
    formData.append('policy', config.policy)
    formData.append('Signature', config.signature)
    formData.append('success_action_status', 200)
    formData.append('file', file)
    // var formData = {
    //   "key":config.dir + '/' + (!fname ? file.name : fname),
    //   "OSSAccessKeyId":config.accessid,
    //   "policy":config.policy,
    //   "Signature":config.signature,
    //   "success_action_status":200,
    //   "file":file
    // }
    http
      .form(config.host, formData)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
