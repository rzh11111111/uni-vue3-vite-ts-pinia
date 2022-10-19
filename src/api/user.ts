import http from '@/utils/request'
import env from '@/config/env'
// tokenSocial, getUserInfo
const apiTest = {
  getTest: (params: GetTest.params) => http.get<GetTest.data>('/test', params),
  postTest: (params: PostTest.params) => http.post<PostTest.data>('/test', params),
  register: (params: PostTest.params) => http.post<PostTest.data>('/users/client/register', params),
  userBindPhone: () => http.post<PostTest.data>(env.YN_URL + '/wap/auth/user/weixin/info/bind', {}),
  getUserInfo: () => http.get<GetTest.data>(env.GATEWAY_URL + '/wap/auth/user/weixin/mobile/bind', {}),
}

export default apiTest
