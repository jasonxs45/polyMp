import { fetch, query } from 'api'
/**==========================
 *         首页广告
 ==========================*/
 let _ad = (uid) => {
   return fetch(
     'WebApi.ashx?Act=GetHomeImage',
     {
       UnionID: uid
     }
   )
 }
 export {
   _ad
 }