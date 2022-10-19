
export function useList (listKey,loadListApi,load) {
    //展示的数据  可以通过App.vue 界面去隐藏
    let queryParams = reactive({
        current: 1,
        size: 10
    })
    let page = ref(1)
    let pagesize = ref(10)
    let list = reactive([])
    let more = ref('more')
    // let timer = null
  function onScrollToLower() {
  console.log('自定义 onScrollToLower')
  loadList()
  console.log(page,'useList')
}
    // onBeforeUnmount(() => {
    //     timer&&clearTimeout(timer)
    // })
    async function loadList ( ) {

      if (more.value !== 'more') return
      more.value = 'loading'
      try {

        const {code,data} = await loadListApi({ page,pagesize,...listKey })
				 // const {code,data} =loadListApi()
        if(code === 1001) { load() }
				// uni.stopPullDownRefresh();
        if (code === 0) {
          page.value++
          more.value = 'more'
          list.push(...data.records)
          if (list.length >= data.total || !data.records.length)
            more.value = 'noMore'

        } else {
          more.value = 'error'
        }
      } catch (e) {
        more.value = 'error'
				// uni.stopPullDownRefresh();
      }
    }

    return {
      page,
      list,
      more,
      loadList,
      onScrollToLower
    }
}
