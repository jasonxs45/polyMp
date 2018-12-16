import { fetch, query } from 'api'
/**==========================
 *         签到
 ==========================*/
//  查询签到
let _signinList = uid => {
  return fetch(
    'WebApi.ashx?Act=SignList',
    {
      UnionID: uid
    }
  )
}
// 签到
let _signin = uid => {
  return fetch(
    'WebApi.ashx?Act=Sign',
    {
      UnionID: uid
    }
  )
}
export {
  _signinList,
  _signin
}