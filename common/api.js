import { baseUrl } from './config'
let fetch = (api, data = {}) => {
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
let query = param => {
  return fetch(
    'WebApi.ashx?Act=Query',
    { "param": JSON.stringify(param) }
  )
}
export {
  fetch,
  query
}