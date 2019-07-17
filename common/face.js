import { fetch, query } from 'api'
/**==========================
 *          人脸识别
 ==========================*/
//  获取楼层
let _floorlist = uid => fetch(
  'WebApi.ashx?Act=GetUserFaceInfo',
  {
    UnionID: uid
  }
)
// 提交申请
let _submit = (uid, photo, floor) => fetch(
  'WebApi.ashx?Act=UpdateFacePic',
  {
    UnionID: uid,
    FacePic: photo,
    Floor: floor
  }
)
export {
  _floorlist,
  _submit
}