<template>
  <!-- :on-scroll-to-lower="onScrollToLower" -->
  <!-- <pullList  :list="list" :loadListApi="loadListApi" >
    <template #list>
      <view>name:{{ name }}</view>
      <view>fullName:{{ fullName }}</view>
      <view @click="updateName('newName')">updateName</view>
      <view>title:{{ title }}</view>
      <view @click="changeTitle">changeTitle</view>
      <view @click="getTest">getTest</view>
      <view @click="postTest">postTest</view>
      <view @click="getCommonParam">getCommonParams</view>
      <view @click="setCommonParam">setCommonParams</view>
      <view @click="uniAsyncTest">uniAsyncTest</view>
      <view data-url="index?a=1" @click="onUrlPage">onUrlPage</view>
      <view class="unocss-test">unocss-test</view>
      <view v-for="i in 20" :key="i" class="p10">scroll Test</view>
      <view v-for="(val,index) in list" :key="index" >{{val}}</view>
    </template>
  </pullList> -->
  <scroll-view
    :style="{
      height: '100%',
      width: '100%',
    }"
    :scroll-y="true"
    :lower-threshold="300"
    @scrolltolower="onScrollToLower"
  >
    <view>name:{{ name }}</view>
    <view>fullName:{{ fullName }}</view>
    <view @click="updateName('newName')">updateName</view>
    <view>title:{{ title }}</view>
    <view @click="changeTitle">changeTitle</view>
    <view @click="getTest">getTest</view>
    <view @click="postTest">postTest</view>
    <view @click="getCommonParam">getCommonParams</view>
    <view @click="setCommonParam">setCommonParams</view>
    <view @click="uniAsyncTest">uniAsyncTest</view>
    <view data-url="index?a=1" @click="onUrlPage">onUrlPage</view>
    <view class="unocss-test">unocss-test</view>
    <view v-for="i in 20" :key="i" class="p10">scroll Test</view>
    <view v-for="(val, index) in list" :key="index">{{ val }}</view>
  </scroll-view>
</template>

<script lang="ts" setup>
import apiTest from '@/api/apiTest'
import { getCommonParams, setCommonParams } from '@/config/commonParams'
import { useInit } from '@/hooks/useInit'
import { useTitle } from '@/hooks/useTitle'
import { onUrlPage } from '@/utils/router'
import uniAsync from '@/utils/uniAsync'
import { useList } from '@/hooks/useList'
onLoad(() => {
  const { pageName, pagePath, pageQuery } = useInit()
  console.log(pageName, pagePath, pageQuery, 'pageName,pagePath, pageQuery')
})
const { title, changeTitle } = useTitle()

const { name, fullName, updateName } = useStore('setup')

async function getTest() {
  const getTest = await apiTest.getTest({ a: 1 })
  if (!getTest) {
    uni.showToast({
      title: '自定义异常处理',
    })
  }
  // getTest.data?.age
  // getTest.data?.name
  console.log(getTest, 'getTest')
}
async function postTest() {
  const postTest = await apiTest.postTest({ a: 1 })
  // postTest.data?.val
  console.log(postTest, 'postTest')
}

function getCommonParam() {
  console.log(getCommonParams())
}
function setCommonParam() {
  setCommonParams({ channel: 'test' })
  getCommonParam()
}

async function uniAsyncTest() {
  const systemInfo = await uniAsync.getSystemInfo()
  console.log(systemInfo, 'systemInfo')
}

const { page, list, more, loadList, onScrollToLower } = useList('123', loadListApi, () => {
  console.log('333')
})

console.log(page, list, more.value, loadList, 'useList')

function loadListApi(aa, bb) {
  console.log(aa, bb)
  return {
    code: 0,
    data: {
      records: [1, 2, 3, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9],
      total: 100,
    },
  }
}
</script>

<style lang="scss" scoped>
.unocss-test {
  padding: 10rpx;
}
</style>
