import { _handledetail as _detail } from '../../common/repair'
import { formatDate } from '../../utils/util'
const app = getApp()
const computedBehavior = require('miniprogram-computed')
const describes = [
  '非常不满意', '不满意', '一般', '满意', '非常满意'
]
Component({
  behaviors: [computedBehavior],
  data: {
    id: '',
    detail: null,
    rateItems: ['响应速度', '服务态度', '处理结果'],
    scores: [],
    steps: [],
    roleName: '',
    role: null,
    state: null,
    describes
  },
  computed: {
    padding() {
      let bool = null
      if (!this.data.detail) {
        bool = false
      } else {
        console.log(this.data.roleName, this.data.detail.Status)
        if (this.data.roleName === '客服') {
          if (this.data.detail.Status === '待受理' || this.data.detail.Status === '待评价') {
            bool = false
          } else {
            bool = true
          }
        }
        if (this.data.roleName === '处理人') {
          if (this.data.state == 0) {
            bool = true
          } else {
            bool = false
          }
        }
        if (this.data.detail.Status === '已完成' ) {
          bool = false
        }
      }
      return bool
    }
  },
  methods: {
    getDetail() {
      app.loading('加载中')
      _detail(this.data.id).then(res => {
        wx.hideLoading()
        let detail = res.data.Repair_Apply
        detail.AddTime = formatDate(new Date(detail.AddTime), 'yyyy/MM/dd hh:mm')
        detail.Img = detail.Img !== "" ? detail.Img.split(',') : []
        let scores = [detail.Evaluate1, detail.Evaluate2, detail.Evaluate3]
        let steps = res.data.Repair_Process_list.map(item => {
          item.AddTime = formatDate(new Date(item.AddTime), 'yyyy/MM/dd hh:mm')
          item.ImgUrl = item.ImgUrl ? item.ImgUrl.split('|') : []
          return item
        })
        this.setData({
          detail,
          steps,
          scores
        })
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    },
    onLoad(options) {
      this.data.state = options.state || null
      this.data.role = options.role
      this.data.id = options.id
      this.data.roleName = this.data.role == 1 ? '客服' : '处理人'
      this.setData({
        id: this.data.id,
        role: this.data.role,
        roleName: this.data.roleName,
        state: this.data.state
      })
    },
    onReady() { },
    onShow() {
      app.memberReadyCb = () => {
        this.getDetail()
      }
      app.fansReadyCb = () => {
        app.checkMember()
      }
      app.init()
    },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() {
      return app.shareInfo
    }
  }
})