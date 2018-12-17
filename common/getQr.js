import { baseUrl } from './config'
// 获取二维码
let _getQr = code => {
  return `${baseUrl}WebApi.ashx?Act=ShowQRCode&code=${code}`
}
export {
  _getQr
}