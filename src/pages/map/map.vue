<template>
	<view>
			<view class="page-body">
				<view class="page-section page-section-gap">
					<map style="width: 100%; height: 300px;"
          id="map"
          :latitude="latitude"
          :longitude="longitude"
          :markers="covers"
          :scale="scale"
          :show-location="true"
          @regionchange="regionchange">
					<cover-view id="1" :clickable="true"  class="cover-view" @click="controltap">
					    <cover-image   class="station" src="https://linli-oss.vecommunity.com/xchx/icon/position.jpg"></cover-image>
					  </cover-view>
          </map>
				</view>
			</view>
		</view>
</template>

<script lang="ts" setup>
	let id='map' // 使用 marker点击事件 需要填写id
			let	title= 'map'
			let	latitude= ref(30.3)
			let	longitude= ref(120.2)
      let scale = ref(20)
			let	covers= [{
        id:1,
					latitude: 30.3,
					longitude: 120.2,
          callout:{
            content:'明浩大厦'
          },
          label:{
            content:'明浩大厦2'
          }
					// iconPath: '../../../static/location.png'
				}, {
          id:2,
					latitude: 39.90,
					longitude: 116.39,
					// iconPath: '../../../static/location.png'
				}]

    function regionchange(e) {
      // 获取地图
      let mpCtx = uni.createMapContext('map')

      // 判断是缩放，打印一下e，就能看到缩放值。注意：需真机测试
      if (e.type == "end" && e.causedBy == "scale") {
        // 如果是缩放，获取房钱缩放值，并修改data中的scale属性（此处很关键）
        mpCtx.getScale({
          success: function(res){
            if (res.scale != scale.value) {
              // 如果缩放了 = 现在的缩放值和初始值不一样时，修改data中的scale值

                scale.value= res.scale

            }
          }
        })
      }
    }
    // 右下角图标绑定的事件：点击右下角图标触发
    function controltap(e) {
      // 创建 map 上下文 MapContext 对象。建议使用 wx.createSelectorQuery 获取 context 对象
      // 获取地图，map要与wxml页面的id名一致。注意：不需要#符号
      let mpCtx = uni.createMapContext('map')

      // 将地图中心移置当前定位点，此时需设置地图组件 show-location 为true。'2.8.0' 起支持将地图中心移动到指定位置。
      mpCtx.moveToLocation({
        longitude:longitude.value,
        latitude:latitude.value
      })

      // 将地图缩放值改为初始值

        scale.value= 20
        console.log(e,'controltap',latitude.value,longitude.value,mpCtx.getCenterLocation())
    }
</script>

<style>
  .cover-view{
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    left: 10rpx;
    bottom: 10rpx;
  }
</style>
