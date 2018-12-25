import { rootUrl } from '../../common/config'
import { _uploadFile } from '../../common/uploadFile'
import default_src from './default'
const app = getApp()
Component({
  properties: {
    group: Array,
    readonly: {
      type: Boolean,
      value: false
    },
    onlyCamera: {
      type: Boolean,
      value: false
    },
    max: Number
  },
  data: {
    current: 0,
    total: 0,
    uploading: false,
    uploadOver: true
  },
  methods: {
    errorHandler (e) {
      let index = e.currentTarget.dataset.index
      this.properties.group[index] = default_src
      this.setData({
        group: this.properties.group
      })
    },
    chooseImg() {
      let count = this.properties.max - this.properties.group.length
      this.setData({
        total: count,
        current: 0
      })
      wx.chooseImage({
        count,
        sourceType: this.properties.onlyCamera ? ['camera'] : ['album', 'camera'],
        success: r => {
          this.setData({
            uploading: true
          })
          let group = []
          for (let i = 0; i < r.tempFilePaths.length; i++) {
            group.push(r.tempFilePaths[i])
            _uploadFile(r.tempFilePaths[i], res => {
              let obj = JSON.parse(res.data)
              let img = rootUrl + obj.url
              group[i]= img
              this.data.current += 1
              this.setData({
                current: this.data.current
              })
              this.triggerEvent('uploading', { img })
              if (i === r.tempFilePaths.length - 1) {
                this.setData({
                  uploading: false
                })
                this.data.group = group
                this.triggerEvent('uploadOver', { group: this.data.group })
              }
            })
          }
        },
        fail: e => {}
      })
    },
    delImg(e) {
      let index = e.currentTarget.dataset.index
      this.properties.group.splice(index, 1)
      this.setData({
        group: this.properties.group
      })
      this.triggerEvent('del', {index, group: this.properties.group})
    },
    previewImg(e) {
      let index = e.currentTarget.dataset.index
      wx.previewImage({
        current: this.properties.group[index],
        urls: this.properties.group
      })
    }
  },
  attached () {}
})
