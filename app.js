import { fetch } from 'common/api'
import { toast, loading } from 'utils/util'
App({
  globalData: {
    s_key: null,
    uid: null,
    fans: null,
    member: null,
    meetingDate: [
      // {
      //   "date": "2019年01月14日",
      //   "value": [
      //     "上午"
      //   ]
      // },
      // {
      //   "date": "2019年01月15日",
      //   "value": [
      //     "上午",
      //     "下午"
      //   ]
      // }
    ]
  },
  updateMeetingDate(meetingDate) {
    this.globalData.meetingDate = meetingDate
  },
  init() {
    let fans = this.globalData.fans || wx.getStorageSync('fans')
    if (!fans) {
      this.loading('加载中')
      wx.login({
        success: r => {
          fetch(
            'WxOpen.ashx?Act=onlogin',
            { code: r.code }
          ).then(res => {
            if (res.data.IsSuccess) {
              wx.setStorageSync('s_key', res.data.Data.sessionId)
              if (res.data.Data.unionid) {
                // 返回信息含有uid
                wx.setStorageSync('uid', res.data.Data.unionid)
                this.globalData.uid = res.data.Data.unionid
                console.log('login返回了uid,直接用uid请求信息')
                fetch(
                  'WebApi.ashx?Act=GetUserInfo',
                  { UnionID: this.globalData.uid }
                ).then(result => {
                  wx.hideLoading()
                  if (result.data.IsSuccess) {
                    // 判断是否有粉丝信息，有就直接获取，没有就跳转授权页面
                    if (result.data.Data.Fans) {
                      wx.setStorageSync('fans', result.data.Data.Fans)
                      this.globalData.fans = result.data.Data.Fans
                      wx.setStorageSync('member', result.data.Data.Member)
                      this.globalData.member = result.data.Data.Member
                      this.fansReadyCb && this.fansReadyCb()
                    } else {
                      wx.redirectTo({
                        url: '/pages/login/index'
                      })
                    }
                  } else {
                    wx.hideLoading()
                    console.log(result)
                    wx.showModal({
                      title: '对不起',
                      content: result.data.Msg || '网络问题，请稍后再试！',
                      showCancel: false
                    })
                  }
                }).catch(err => {
                  console.log(err)
                })
              } else {
                console.log('login没有返回uid,跳转授权页面')
                wx.redirectTo({
                  url: '/pages/login/index'
                })
              }
            } else {
              wx.showModal({
                title: '对不起',
                content: res.data.Msg,
                showCancel: false
              })
            }
          }).catch(e => {
            wx.hideLoading()
            wx.showModal({
              title: '对不起',
              content: JSON.stringify(e),
              showCancel: false
            })
          })
        },
        fail: e => {
          wx.showModal({
            title: '对不起',
            content: '微信登录失败，请稍后再试！',
            showCancel: false
          })
        }
      })
    } else {
      this.globalData.s_key = wx.getStorageSync('s_key')
      this.globalData.uid = wx.getStorageSync('uid')
      this.globalData.fans = wx.getStorageSync('fans')
      this.globalData.member = wx.getStorageSync('member')
      this.fansReadyCb && this.fansReadyCb()
    }
  },
  checkMember() {
    let member = this.globalData.member || wx.getStorageSync('member')
    if (!member) {
      wx.showModal({
        title: '对不起',
        content: '您未注册会员，请先注册会员',
        success: res => {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/regist/regist'
            })
          }
          if (res.cancel) {
            wx.switchTab({
              url: '/pages/home/index'
            })
          }
        }
      })
    } else {
      this.globalData.s_key = wx.getStorageSync('s_key')
      this.globalData.uid = wx.getStorageSync('uid')
      this.globalData.fans = wx.getStorageSync('fans')
      this.globalData.member = wx.getStorageSync('member')
      this.memberReadyCb && this.memberReadyCb()
    }
  },
  toast,
  loading,
  onLaunch() { },
  onShow() { }
})