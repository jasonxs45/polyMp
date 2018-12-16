import { fetch, query } from 'api'
/**==========================
 *         积分
 ==========================*/
//  查询积分
let _getscore = MemberID => {
  let param = {
    Score_Log_sum: {
      field: "Score",
      MemberID //会员ID Member对象ID
    }
  }
  return query(param)
}
// 查询积分记录
let _getscoreRecord = (MemberID, pageIndex = 1, pageSize = 10) => {
  let param = {
    Score_Log_list: {
      field: "Title,Score,AddTime",
      MemberID,
      order: "AddTime-",
      page: pageIndex,
      count: pageSize
    },
    total_count: ""
  }
  return query(param)
}
export {
  _getscore,
  _getscoreRecord
}