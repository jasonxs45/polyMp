import { fetch, query } from 'api'
/**==========================
 *         首页广告
 ==========================*/
 let _ad = () => {
   return fetch(
     'WebApi.ashx?Act=GetHomeImage'
   )
 }
 export {
   _ad
 }