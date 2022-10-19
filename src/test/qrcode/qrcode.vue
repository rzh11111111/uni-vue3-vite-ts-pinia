<template>
  <view>
    <!--分享-->
    <view class="share" @click="is_show_model = true">有奖分享</view>
    <!--模态弹窗-->
    <view
      class="cu-modal bottom-modal"
      :class="[is_show_model ? 'show' : '']"
      @click.stop="is_show_model = false"
    >
      <view
        class="cu-dialog bottom-md"
        style="border-top-left-radius: 20rpx; border-top-right-radius: 20rpx"
        @click.stop=""
      >
        <view class="md-content">
          <view class="md-content-item">
            <image open-type="share" src="../../static/zhangyu-qrcode-poster/wechat.png"></image>
            <view>分享给好友</view>
            <button open-type="share" @click="is_show_model = false" class="sharebtn"></button>
          </view>
          <view class="md-content-item" @click="sharePoster">
            <image src="../../static/zhangyu-qrcode-poster/haibao.png"></image>
            <view>生成海报</view>
          </view>
        </view>
        <view class="cancel" @click="is_show_model = false">取消</view>
      </view>
    </view>
    <!-- :headerImg="../../static/zhangyu-qrcode-poster/wechat.png" :abImg="../../static/zhangyu-qrcode-poster/wechat.png" -->
    <qrcode-poster ref="poster"></qrcode-poster>
  </view>
</template>
<!-- 文档 -->
<!-- https://ext.dcloud.net.cn/plugin?id=2146 -->
<script>
import QrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'

export default {
  components: {
    QrcodePoster,
  },
  data() {
    return {
      is_show_model: false, //是否显示分享模态窗
    }
  },
  methods: {
    //分享海报
    sharePoster() {
      //获取带参数二维码并传递
      this.is_show_model = false
      this.$refs.poster.showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg')
    },
  },
}
</script>

<style>
.share {
  position: fixed;
  right: 0;
  bottom: 190rpx;
  padding: 10rpx 10rpx 10rpx 20rpx;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: linear-gradient(to bottom right, #fe726b, #fe956b);
  box-shadow: 0 0 20upx rgba(0, 0, 0, 0.09);
  color: #fff;
}
.cancel {
  padding: 30rpx;
  width: 100vw;
  background: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 30rpx;
  color: red;
}
.md-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 50rpx 0;
}
.md-content-item {
  position: relative;
  margin: 0 70rpx;
}
.md-content-item image {
  width: 100rpx;
  height: 100rpx;
}
.md-content-item view {
  margin-top: 15rpx;
  font-size: 28rpx;
}
.sharebtn {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
</style>
