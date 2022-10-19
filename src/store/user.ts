import apiTest from '@/api/user'
export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
    H5Storage: window?.localStorage,
    strategies: [
      {
        key: 'user',
        storage: window?.sessionStorage,
      },
    ],
  },
  state: () => {
    return {
      id: '',
      access_token: '',
      refresh_token: '',
      userInfo: {},
      userPhone: '',
      timeNode: '',
      invoiceData: {},
      receiptData: {},
      orderUser: {},
      travelUser: {},
      Historical: [],
      orderInfo: {},
      isLogin: false, //判断是否登陆
      isMobile: 0,
      token: 'token',
      user_id: 111,
    }
  },
  getters: {
    // logged: (state) => {
    //   const { token, user_id } = state.userInfo
    //   return !!(token && user_id)
    // },
    // token: (state) => {
    //   return state.userInfo.token
    // },
    // userId: (state) => {
    //   return state.userInfo.user_id
    // },
  },
  actions: {
    setUserInfo(userInfo) {
      Object.assign(this.userInfo, userInfo)
    },
    async getUserInfo({ commit }) {
      const { status, data } = await apiTest.getUserInfo()
      if (status === 200) {
        this.userInfo = data
        this.isMobile = data.mobile
      }
      // this.userInfo = 111
      // this.isMobile = 222
    },
  },
})
