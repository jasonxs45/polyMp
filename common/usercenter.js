import { fetch, query } from 'api'
/**==========================
 *         个人中心
 ==========================*/
let _modifyInfo = (opt) => {
   return fetch(
     'WebApi.ashx?Act=EditUserInfo',
     opt
    )
 }
// 重新获取会员信息
let _updateInfo = uid => {
  return fetch(
    'WebApi.ashx?Act=GetUserInfo',
    { UnionID: uid }
  )
}
 export {
   _modifyInfo,
  _updateInfo
 }