import { fetch, query } from 'api'
/**==========================
 *         红包
 ==========================*/
//  查询红包
let _money = MemberID => {
  let param = {
    Red_Log_sum: {
      field: "RedMoney",
      MemberID //会员ID Member对象ID
    }
  }
  return query(param)
}
// 查询红包记录
let _record = (MemberID, pageIndex = 1, pageSize = 10) => {
  let param = {
    Red_Log_list: {
      field: "Title,RedMoney,AddTime",
      MemberID,
      order: "AddTime-",
      page: pageIndex,
      count: pageSize
    },
    total_count: ""
  }
  return query(param)
}
// 提现
let _toaccount = (MemberID, Money) => {
  return fetch(
    'WebApi.ashx?Act=ReceiveRedPacket',
    { MemberID, Money }
  )
}
//  查询是否有注册红包
let _redpacket = UnionID => {
  return fetch(
    'WebApi.ashx?Act=GetMemberRedState',
    {
      UnionID
    }
  )
}
export {
  _money,
  _record,
  _toaccount,
  _redpacket
}