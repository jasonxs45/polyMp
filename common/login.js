import { fetch } from './api'
// doLogin 通过wx.login获取uid，获取不到则跳转授权页面
// 授权用户信息
export function getUserInfoByKey(opt) {
  let { iv, encryptedData, key } = opt
  return fetch('WxOpen.ashx?Act=getuserinfo', { iv, encryptedData, key })
}