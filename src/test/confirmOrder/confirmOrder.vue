<template>
  <view>
    <labelInput
      ref="name"
      :left="item.name.left"
      :placeholder="item.name.placeholder"
      :right="item.name.right"
    ></labelInput>
    <labelInput
      ref="city"
      :disabled="true"
      @clickfun="clickfun('city')"
      :inputValue="'第三节课第三节课'"
      :left="item.name.left"
      :placeholder="item.name.placeholder"
      :right="item.name.right"
    ></labelInput>
    <labelInput ref="address"></labelInput>
    <labelInput ref="reason"></labelInput>
    <button @click="getdata">获取数据</button>
  </view>
</template>

<script lang="ts" setup>
import apiTest from '@/api/apiTest'
const formdata = ['name', 'city', 'address', 'eason']
const item = reactive({
  name: {
    left: '文章标题:',
    right: 'right',
    placeholder: 'X',
  },
})
const name = ref()
const city = ref()

const getdata = () => {
  // apiTest.register({ a: 1 }).then((res)=>{
  //   console.log(res,'register')
  // })
  console.log(name.value.inputValue, city.value.inputValue)
}
const clickfun = (type) => {
  console.log(type, 'clickfun')
}
</script>

<style></style>
