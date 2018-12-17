import { baseUrl } from './config'
// 上传文件
let _uploadFile = (filePath, cb) => {
  wx.uploadFile({
    url: `${baseUrl}Upload.ashx`,
    filePath,
    name: 'imgFile',
    success: res => {
      cb && cb(res)
    },
    fail: err => {
      wx.showModal({
        title: '对不起',
        content: '上传失败，请稍候再试',
        showCancel: false
      })
    }
  })
}
export {
  _uploadFile
}