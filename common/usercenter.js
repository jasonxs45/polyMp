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
 export {
   _modifyInfo
 }