import http from '@/utils/request'
import env from '@/config/env'
const apiTest = {
  getTest: (params: GetTest.params) => http.get<GetTest.data>('/test', params),
  postTest: (params: PostTest.params) => http.post<PostTest.data>('/test', params),
  register: (params: PostTest.params) => http.post<PostTest.data>('/users/client/register', params),
  createUpload: (params: GetTest.params) => http.get<GetTest.data>(env.onloadurl+'/admin/auth/system/oss/policy', params),
  otherRegister: (params: PostTest.params) => http.post<PostTest.data>(env.onloadurl+"/users/client/register", params),
}

export default apiTest
