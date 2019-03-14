import {
  _orderdetail as _detail,
  _roomlist,
  _dates,
  _modify
} from '../../common/meeting'
import { formatDate, formatNumber } from '../../utils/util'
const computedBehavior = require('miniprogram-computed')
const app = getApp()
Component({
  behaviors: [computedBehavior],
  data: {
    id: null,
    detail: null,
    roomlist: [],
    roomIndex: null,
    selecting: false,
    selectedDates: [],
    dates: [],
    remark: '',
    price: '',
    goodsArr: []
  },
  computed: {
    showDates() {
      if (this.data.selectedDates.length) {
        let origin = this.data.selectedDates
        let arr = []
        for (let i = 0; i < origin.length; i++) {
          let obj = {}
          obj.date = origin[i].Date
          obj.value = []
          if (origin[i].amChecked) {
            obj.value.push('上午')
          }
          if (origin[i].pmChecked) {
            obj.value.push('下午')
          }
          arr.push(obj)
        }
        return arr
      } else {
        if (this.data.detail) {
          return this.data.detail.TimeList
        } else {
          return []
        }
      }
    }
  },
  methods: {
    dates() {
      app.loading('加载中')
      _dates(this.data.roomid).then(res => {
        console.log(res)
        wx.hideLoading()
        if (res.data.IsSuccess) {
          this.data.dates = res.data.Data.map(item => {
            item.Date = formatDate(new Date(item.Date), 'yyyy年MM月dd日')
            let dates = this.data.showDates
            for (let i = 0; i < dates.length; i++) {
              if (dates[i].date === item.Date) {
                console.log(dates[i].date, dates[i].value)
                item.amChecked = dates[i].value.includes('上午')
                item.pmChecked = dates[i].value.includes('下午')
              }
            }
            return item
          })
          this.setData({
            dates: this.data.dates
          })
        } else {
          wx.showModal({
            title: '对不起',
            content: res.data.Msg,
            showCancel: false
          })
        }
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，请稍后再试',
          showCancel: false
        })
      })
    },
    addLine() {
      this.data.goodsArr.push({
        name: '',
        price: '',
        count: ''
      })
      this.setData({
        goodsArr: this.data.goodsArr
      })
    },
    remove(e) {
      let index = e.currentTarget.dataset.index
      this.data.goodsArr.splice(index, 1)
      this.setData({
        goodsArr: this.data.goodsArr
      })
    },
    nameInput(e) {
      let value = e.detail.value
      let index = e.currentTarget.dataset.index
      let str = `goodsArr[${index}].name`
      this.setData({
        [str]: value
      })
    },
    countInput(e) {
      let value = e.detail.value
      let index = e.currentTarget.dataset.index
      let str = `goodsArr[${index}].count`
      this.setData({
        [str]: value
      })
    },
    priceInput(e) {
      let value = e.detail.value
      let index = e.currentTarget.dataset.index
      let str = `goodsArr[${index}].price`
      this.setData({
        [str]: value
      })
    },
    totalQuery() {
      app.loading('加载中')
      Promise.all([
        _detail(this.data.id),
        _roomlist()
      ]).then(res => {
        wx.hideLoading()
        let detail = res[0].data.Meeting_Apply
        let remark = detail.Remark
        let price = detail.OrderAmount + ''
        let goodsArr = detail.ItemList ? JSON.parse(detail.ItemList) : []
        detail.AddTime = formatDate(new Date(detail.AddTime), 'yyyy年MM月dd hh:mm')
        detail.TimeList = JSON.parse(detail.TimeList)
        let roomlist = res[1].data.Meeting_Room_list
        let roomIndex = roomlist.findIndex(item => item.Name === detail.RoomName)
        roomIndex = roomIndex === -1 ? null : roomIndex
        this.setData({
          detail,
          roomlist,
          roomIndex,
          remark,
          price,
          goodsArr
        }, () => {
          if (roomIndex !== -1) {
            this.dates()
          }
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，请稍后再试'
        })
      })
    },
    roomSelect(e) {
      this.setData({
        roomIndex: e.detail.value,
        ['detail.TimeList']: [],
        selectedDates: []
      })
      this.data.roomid = this.data.roomlist[this.data.roomIndex].ID
      this.dates()
      this.showSelect()
    },
    showSelect() {
      this.setData({
        selecting: true
      })
    },
    hideSelect() {
      this.setData({
        selecting: false
      })
    },
    textHandler (e) {
      this.data.remark = e.detail.value
    },
    priceHandler (e) {
      let price = e.detail.replace(/\,/g, '')
      // price.substr(0,price.indexOf('.')+1)
      // price = price.substr(0, price.indexOf('.') + 3)
      // if (price.includes('.')) {
      //   // this.data.price = formatNumber(price, 2)
      // } else {
      //   this.data.price = formatNumber(price, 0)
      // }
      this.data.price = price
      this.setData({
        price: this.data.price
      })
    },
    checkHandler(e) {
      let index = e.currentTarget.dataset.index
      let value = e.detail.value
      this.data.dates[index].amChecked = value.includes('上午')
      this.data.dates[index].pmChecked = value.includes('下午')
      // if (value.length > 0) {
      //   let date = this.data.dates[index].Date
      //   let idx = this.data.selectedDates.findIndex(item => item.date === date)
      //   if (idx === -1) {
      //     this.data.selectedDates.push({
      //       date: this.data.dates[index].Date,
      //       value
      //     })
      //   } else {
      //     this.data.selectedDates[idx].value = value
      //   }
      // }
      // this.data.dates[index].amChecked = value.includes('上午')
      // this.data.dates[index].pmChecked = value.includes('下午')
      // this.setData({
      //   dates: this.data.dates
      // })
    },
    confirm() {
      this.data.selectedDates = this.data.dates.filter(item => {
        if (item.amChecked || item.pmChecked) {
          return item
        }
      })
      this.setData({
        selectedDates: this.data.selectedDates
      }, () => {
        this.hideSelect()
      })
    },
    modify () {
      if (!this.data.showDates.length) {
        app.toast('预约时间不能为空')
        return
      }
      for (let i = 0; i < this.data.goodsArr.length; i++) {
        let goods = this.data.goodsArr[i]
        if (!String(goods.name).trim()) {
          app.toast(`请填写第${i + 1}件物品的名称`)
          return
        }
        if (!String(goods.price).trim()) {
          app.toast(`请填写第${i + 1}件物品的单价`)
          return
        }
        let price = Number(goods.price)
        if (isNaN(price) || price < 0) {
          app.toast('请填写有效单价')
          return
        }
        if (!String(goods.count).trim()) {
          app.toast(`第${i + 1}件物品的数量不能为空`)
          return
        }
        let count = Number(goods.count)
        if (isNaN(count) || count < 0) {
          app.toast('请填写有效数量')
          return
        }
      }
      if (!String(this.data.price).trim()) {
        app.toast('费用不能为空')
        return
      }
      let cost = Number(this.data.price)
      if (isNaN(cost) || cost < 0) {
        app.toast('请填写有效费用')
        return
      }
      let ID = this.data.id
      let UnionID = app.globalData.uid || wx.getStorageSync('uid')
      let RoomID = this.data.roomid
      let Remark = this.data.remark
      let TimeList = JSON.stringify(this.data.showDates)
      let ItemList = JSON.stringify(this.data.goodsArr)
      console.log(ItemList)
      let OrderAmount = this.data.price
      app.loading('加载中')
      _modify(ID, UnionID, RoomID, Remark, TimeList, ItemList, OrderAmount).then(res => {
        console.log(res)
        wx.hideLoading()
        wx.showModal({
          title: res.data.IsSuccess ? '温馨提示' : '对不起',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm) {
              wx.navigateBack()
            }
          }
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，请稍后再试',
          showCancel: false
        })
      })
    },
    onLoad(options) {
      this.data.id = options.id
      this.data.roomid = options.roomid
      this.totalQuery()
    },
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})