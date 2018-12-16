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
      field: "ID,Name,SmallImg,Sort,ExchangeCount,AddTime,Score,Recommend,ExchangeCount", //查询字段
      order, //默认排序
      Recommend: recommend, //只查询推荐商品（首页使用）
      page: pageIndex, //当前页数
      count: pageSize, //每页条数
    },
    total_count: ''
  }
  return query(param)
}
export {
  _list
}