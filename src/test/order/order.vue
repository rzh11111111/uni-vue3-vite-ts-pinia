<template>
  <view>
    <view>1</view>
    <view>1</view>
    <view>1</view>
    <view>1</view>
    <liuyuno-tabs
      :tabData="tabs"
      :config="{ activeColor: 'blue' }"
      :defaultIndex="defaultIndex"
      @tabClick="handleItemClick"
    />
  </view>
</template>

<script setup lang="ts">
import liuyunoTabs from '@/components/liuyuno-tabs/liuyuno-tabs.vue'

let tabs = reactive([
  {
    name: '中国明星',
    id: 2001,
  },
  {
    name: '欧美明星',
    id: 2002,
  },
])
let defaultIndex = ref(0)
function handleItemClick(e) {
  console.log(e)
}
</script>

<style></style>
