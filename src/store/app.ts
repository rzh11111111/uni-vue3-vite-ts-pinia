export default defineStore({
  id: 'app',
  state: () => {
    return {
      systemInfo: {},
    } as {
      systemInfo: UniApp.GetSystemInfoResult
    }
  },
  actions: {
    getSystemInfo(): UniApp.GetSystemInfoResult {
      // if (Object.keys(this.systemInfo).length) return this.systemInfo
      const systemInfo = uni.getSystemInfoSync()
      console.log(systemInfo, 'getSystemInfo')
      // Object.assign(this.systemInfo, systemInfo)
      this.systemInfo = systemInfo
      return systemInfo
    },
  },
})
