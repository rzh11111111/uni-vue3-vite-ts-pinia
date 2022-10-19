<script setup lang="ts">
import env from '@/config/env'
import apiTest from '@/api/apiTest'
import user from '@/store/user'
onLaunch(() => {
  console.log('App Launch')
  console.log(env.apiEnv, 'apiEnv')
  const appStore = useStore('app')
  const systemInfo = appStore.getSystemInfo()
  console.log(systemInfo, 'systemInfo')
  const user_store = user()
  const users = {
    deviceUuid: systemInfo.deviceId,
    deviceType: 'mini',
    clientInfoType: 21,
    versionNo: systemInfo.version
  }
    apiTest.otherRegister(users).then(res=>{
      console.log(res,'otherRegister')
      user_store.id = res.result.id
    })

})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})


</script>
<style lang="scss">
@import 'static/css/index.scss';
@import '@/uni_modules/uni-scss/index.scss';
</style>
