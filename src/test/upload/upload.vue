<template>
  <view>
    <uni-file-picker
      v-model="imageValue"
      fileMediatype="image"
      mode="grid"
      ref="files"
      @select="select"
      @progress="progress"
      @success="success"
      @fail="fail"
    />
    <button @click="register">注册</button>
  </view>
</template>

<script setup>
import apiTest from '@/api/apiTest'
import { upload } from '@/utils/aliyun-oss'
let imageValue = reactive([
  {
    url: 'https://syyjj-default.oss-cn-hangzhou.aliyuncs.com/upload/20221018/8872D2AF01A1FE5202D1855144798C36.png',
    name: '',
  },
])

// 获取上传状态
function select(e) {
  console.log('选择文件：', e)
  console.log(imageValue, 'select')
  uploadRequest(e)
}
// 获取上传进度
function progress(e) {
  console.log('上传进度：', e)
}

// 上传成功
function success(e) {
  console.log('上传成功')
  console.log(imageValue, 'success')
}

// 上传失败
function fail(e) {
  console.log('上传失败：', e)
}
const files = ref()

// 生成 uuid
function createUUID(lenParam, radixParam) {
  var len = lenParam || 16
  var radix = radixParam || 16
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = []
  var i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    var r
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

function uploadRequest(e) {
  let file = e.tempFiles[0]
  console.log(file, 'file1')
  if (!file) {
    return false
    // .toLowerCase()
  } else if (!/\.(jpg|jpeg|png)$/.test(file.name)) {
    console.log(file.name, '传格式不正确')
    uni.showLoading({
      title: '上传格式不正确，请上传jpg、jpeg、png格式',
    })
    return false
  }
  var pos = file.name.lastIndexOf('.'),
    suffix = '.png'
  console.log('suffix = .png;')
  if (pos !== -1) {
    suffix = file.name.substring(pos)
  }
  console.log('if(pos !== -1)')
  var fname = createUUID(32) + suffix
  console.log(fname, 'fname’')
  apiTest.createUpload().then(
    (params) => {
      var config = params.result
      // console.log(config,'config',e.tempFilePaths)

      let formData = {
        key: config.dir + '/' + (!fname ? file.name : fname),
        OSSAccessKeyId: config.accessid,
        policy: config.policy,
        Signature: config.signature,
        success_action_status: 200,
        file: file,
      }
      console.log(file.path, 'filePath', formData, 'formData', fname, 'fname', file, 'file')
      uni.uploadFile({
        url: config.host, //仅为示例，非真实的接口地址
        filePath: file.path,
        name: 'file',
        formData: formData,
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data)
        },
      })
    },
    (err) => {
      console.log('err', 'err')
      uni.showLoading({
        title: err + '123',
      })
    }
  )
}
</script>

<style></style>
