import { baseUrl } from './config'
export function fetch (api, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl + api}`,
      data,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}