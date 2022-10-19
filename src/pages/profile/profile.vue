<template>
  profile
  <view class="userMobile" v-if="user_store.mobile">{{ user_store.mobile }}</view>
  <button class="uname" v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
    <view class="dengl">登录/注册</view>
  </button>
</template>

<script lang="ts" setup>
import { useInit } from '@/hooks/useInit'
import user from '@/store/user'
import apiTest from '@/api/user'
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit()
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery')

  // user_store.updateName('zzzzz')
  // console.log(user_store.name,'user_store')
})
const user_store = user()
function getPhoneNumber({ detail }) {
  console.log(detail, 3333333)
  if (detail.errMsg === 'getPhoneNumber:ok') {
    apiTest
      .userBindPhone(detail.code)
      .then((res) => {
        console.log(res, 'res')
        if (res.status == 200) {
          // _this.$store.dispatch('user/getUserInfo').then(res => {});
          user_store.getUserInfo({ commit: 0 })
        } else {
          console.log('!200')
          user_store.getUserInfo({ commit: 0 })
        }
      })
      .catch((fail) => {
        console.log(fail, '个人fail')
        user_store.getUserInfo({ commit: 0 })
      })
  } else {
    uni.showToast({
      title: '您取消了授权',
      icon: 'none',
    })
  }
}
</script>

<style lang="scss" scoped></style>
