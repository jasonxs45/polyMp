import { fetch } from './api'
// doLogin 通过wx.login获取uid，获取不到则跳转授权页面
// 授权用户信息
export function getUserInfoByKey(opt) {
  let { iv, encryptedData, key } = opt
  return fetch('WxOpen.ashx?Act=getuserinfo', { iv, encryptedData, key })
}
// 通过unionid获取用户信息
function getUserInfoByUID (uid) {
  console.log('通过uid直接查询用户信息')
  return fetch('WebApi.ashx?Act=GetUserInfo', { UnionID: uid })
}