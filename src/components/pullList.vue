<template>
  <scroll-view
    :style="{
      height: '100%',
      width: '100%',
    }"
    :scroll-y="true"
    :lower-threshold="300"
    :scroll-top="scrollTop"
    @scrolltolower="onScrollToLower"
    @scroll="onScroll"
  >
    <slot name="list"></slot>
  </scroll-view>
</template>

<script setup lang="ts">
let queryParams = reactive({
  current: 1,
  size: 10,
})
let list = reactive([])
let more = ref('more')
defineProps({
  scrollTop: {
    type: Number,
    default: 0,
  },
  // onScrollToLower: {
  //   type: Function,
  //   default: () => {
  //     console.log('onScrollToLower')
  //     this.loadList()
  //     console.log(queryParams,'useList')
  //   },
  // },
  onScroll: {
    type: Function,
    default: () => {
      console.log('onScroll')
    },
  },
  // list: {
  //   type: Array,
  //   default: []
  // },
  loadListApi: {
    type: Function,
    default: () => {
      console.log('loadListApi')
    },
  },
})

async function loadList() {
  console.log('loadList1')
  if (more.value !== 'more') return
  more.value = 'loading'
  try {
    console.log('loadList2')
    // const {code,data} = await loadListApi({ ...queryParams,...listKey })
    const { code, data } = loadListApi()
    console.log('loadList4')
    if (code === 1001) {
      load()
    }
    // uni.stopPullDownRefresh();
    console.log('loadList5')
    if (code === 0) {
      queryParams.current++
      more.value = 'more'
      list.push(...data.records)
      if (list.length >= data.total || !data.records.length) more.value = 'noMore'
    } else {
      more.value = 'error'
    }
  } catch (e) {
    console.log('loadList3')
    more.value = 'error'
    // uni.stopPullDownRefresh();
  }
}

function onPulling(e) {
  console.log('onpulling', e)
}
function onScrollToLower() {
  console.log('onScrollToLower')
  loadList()
  console.log(queryParams, 'useList')
}
defineExpose({
  queryParams,
  more,
  list,
  loadList,
})
</script>

<style scoped lang="scss"></style>
