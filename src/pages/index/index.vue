<template>
  <view class="content">
    <uni-nav-bar :fixed="true" status-bar left-icon="left" left-text="返回" title="自定义导航栏" />
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view @click="changeTitle">changeTitle</view>
    <view @click="forward('test', { a: 1 })">测试页</view>
    <view @click="forward('order', { a: 1 })">订单页</view>
    <view @click="forward('orderDetail', { a: 1 })">订单详情页</view>
    <button @click="forward('confirmOrder', { a: 1 })">确认订单</button>
    <button @click="forward('upload', { a: 1 })">上传</button>
    <button @click="forward('uploadMore', { a: 1 })">多张上传</button>
    <button @click="forward('qrcode', { a: 1 })">生成海报</button>
    <button @click="chooseloca">选择城市</button>
    <button @click="handleLocation">获取定位</button>
    <button @click="toPages('/pages/chooseCity/chooseCity')">去选择城市</button>
    <button @click="toPages('/pages/map/map')">去地图</button>
    <button @click="toPages('/pages/login/login')">去一键登录</button>
    <button @click="open">打开弹窗</button>
    <uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup>
  </view>
</template>

<script setup lang="ts">
import { useTitle } from '@/hooks/useTitle'
import { forward } from '@/utils/router'
const { title, changeTitle } = useTitle()
const popup = ref()
console.log(popup, 'popup')

function open() {
  console.log('111')
  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
  popup.value.open('top')
}

function toPages(url) {
  console.log(url)
  uni.navigateTo({
    url,
  })
}

function goTest() {
  forward('test', {
    a: 1,
  })
}
function getSettingMess() {
  // 获取已授权类别
  uni.getSetting({
    success(res) {
      if (res.authSetting['scope.userLocation']) {
        console.log('userLocation位置功能已授权')
        // 如果已授权,直接获取对应参数
        uni.getLocation({
          success(res) {
            console.log(res)
          },
        })
      } else if (!res.authSetting['scope.userLocation']) {
        // 说明此时要获取的位置功能尚未授权,
        // 则设置进入页面时主动弹出，直接授权
        uni.authorize({
          scope: 'scope.userLocation',
          success(res) {
            // 授权成功
            console.log(res)
            // 成功后获取对应的位置参数
            uni.getLocation({
              success(res) {
                console.log(res)
              },
            })
          },
          fail(fail) {
            console.log(fail, '位置授权失败')
          },
        })
      }
    },
    fail() {
      console.log('获取授权信息授权失败')
    },
  })
}
onBeforeMount(() => {
  // 初始化页面,执行查看已授权信息
  getSettingMess()
})

// 如果初始进入页面时点击了拒绝授权,如需要该权限,需要手动授权
// 手动授权的触发方法
function handleLocation() {
  uni.getSetting({
    success(res) {
      if (res.authSetting['scope.userLocation']) {
        // 再次判断所需权限是否已授权,如已授权则直接使用
        uni.getLocation({
          success(res) {
            console.log(res)
          },
        })
      } else if (!res.authSetting['scope.userLocation']) {
        // 如未授权则重新打开设置页面,进行授权
        uni.showModal({
          //弹出提示框
          title: '是否打开设置页？',
          content: '需要在设置中获取xx信息和xx权限',
          success(res) {
            if (res.confirm) {
              // 用户点击确定按钮
              uni.openSetting({
                // 确认后打开设置页面
                success(res) {
                  if (res.authSetting['scope.userLocation']) {
                    console.log('手动授权成功')
                  } else {
                    console.log('手动授权失败')
                  }
                },
                fail() {
                  console.log('打开设置页面失败')
                },
              })
            } else if (res.cancel) {
              // 用户点击取消按钮
              console.log('用户点击取消')
            }
          },
          fail() {
            console.log('确认取消弹出未弹出')
          },
        })
      }
    },
    fail() {
      console.log('获取已授权信息失败')
    },
  })
}
function chooseloca() {
  uni.chooseLocation({
    success: function (res) {
      console.log('位置名称：' + res.name)
      console.log('详细地址：' + res.address)
      console.log('纬度：' + res.latitude)
      console.log('经度：' + res.longitude)
    },
    fail: (fail) => {
      console.log(fail, 'chooseLocation')
    },
  })
}
</script>

<style scoped lang="scss">
$nav-height: 30px;
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  width: 200rpx;
  height: 200rpx;
}
.text-area {
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
