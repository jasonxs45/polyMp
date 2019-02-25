import { fetch, query } from 'api'
/**==========================
 *           商城
 ==========================*/
//  列表
let _list = (order = 'Sort', pageIndex = 1, pageSize = 6, recommend = null) => {
  let param = {
    Shop_Goods_list: {
      Online: true, //已上线
      IsDelete: false, //未删除
      field: "ID,Name,SmallImg,Sort,ExchangeCount,AddTime,Score,Recommend,ExchangeCount,State", //查询字段
      order, //默认排序
      Recommend: recommend, //只查询推荐商品（首页使用）
      page: pageIndex, //当前页数
      count: pageSize, //每页条数
    },
    total_count: ''
  }
  return query(param)
}
//  详细
let _detail = id => {
  var param = {
    Shop_Goods: {
      ID: id,
      Online: true, //已上线
      IsDelete: false, //未删除
    }
  }
  return query(param)
}
// 兑换
let _exchange = (uid, gid) => {
  return fetch(
    'WebApi.ashx?Act=ScoreExchange',
    {
      UnionID: uid,
      GoodsID: gid
    }
  )
}
// 兑换记录
let _record = (memberid, pageIndex = 1, pageSize = 6, used = null) => {
  let param = {
    Shop_Exchange_list: {
      IsDelete: false,
      order: "AddTime-",
      MemberID: memberid,//条件 会员id
      Used: used, //填写true查询已使用，false查询未使用
      page: pageIndex, //当前页数
      count: pageSize, //每页条数
      join: {
        inner_join: {
          join: "Shop_Goods.ID,Shop_Exchange.GoodsID",
          field: "SmallImg"
        }
      }
    },
    total_count: ""
  }
  return query(param)
}
// 兑换详情
let _recordDetail = (memberid, id) => {
  var param = {
    Shop_Exchange: {
      IsDelete: false,
      MemberID: memberid, //会员ID
      ID: id, //兑换记录ID
      join: {
        inner_join: {
          join: "Shop_Goods.ID,Shop_Exchange.GoodsID",
          field: "BigImg,Content"
        }
      }
    }
  }
  return query(param)
}
// 礼品核销
let _sign = (SN, UnionID) => {
  return fetch(
    'WebApi.ashx?Act=TicketSign',
    { SN, UnionID }
  )
}
export {
  _list,
  _detail,
  _exchange,
  _record,
  _recordDetail,
  _sign
}