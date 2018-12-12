import { fetch } from './api'
export function checkUid (cb) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'uid',
      success(r) {
        console.log('本地storage已存在uid,可直接使用')
        resolve(r)
      },
      fail(e) {
        console.log('本地storage不存在uid,先登录')
        reject(e)
      }
    })
  })
}
export function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: r => {
        console.log('登录success')
        resolve(fetch('WxOpen.ashx?Act=onlogin', { code: r.code }))
      },
      fail: e => {
        console.log('登录fail')
        reject(e)
      }
    })
  })
}
export function getUserInfo(opt) {
  let { iv, encryptedData, key } = opt
  return fetch('WxOpen.ashx?Act=getuserinfo', { iv, encryptedData, key })
}