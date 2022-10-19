<template>
  <view class="babel-input">
    <view class="left">{{left}}</view>
    <input class="center"  v-model="inputValue" @click="clickfun"  :disabled="disabled" type="text" :placeholder="placeholder" :maxlength="maxlength"/>
    <view class="right" v-if="right">
      <uni-icons type="right" v-if="right==='right'" size="30"></uni-icons>
      <uni-icons type="location-filled" v-if="right==='location'" size="30"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
   const props = defineProps({
    placeholder: {
      type: String,
      default:''
    },
    left:{
      type: String,
      default: ''
    },

    right: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 30
    },
    inputValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
console.log(props,props.placeholder,'myprops')
  let inputValue =ref(props.inputValue||'')

   //先定义一下子 在发送值
 const  emits = defineEmits(['clickfun']);

 const  clickfun = () => {
   emits('clickfun','子的值')
 }
  defineExpose({
    inputValue
  })
</script>

<style scoped lang="scss">
  .babel-input{
    width: 100%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .center{
    flex: 1;
  }
</style>
