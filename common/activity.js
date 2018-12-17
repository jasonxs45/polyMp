import { fetch, query } from 'api'
/**==========================
 *           活动
 ==========================*/
let _list = (over, pageIndex = 1, pageSize = 5) => {
  if (over === 'over') {
    over = true
  } 
  if (over === 'unover') {
    over = false
  }
  let day = new Date()
  let year = day.getFullYear()
  let month = day.getMonth() + 1
  let date = day.getDate()
  let param = {
    Activity_Activity_list: {
      Online: true, //已上线
      IsDelete: false, //未删除
      field: "ID,Name,SmallImg,ApplyEnd,PlayEnd,Sort", //查询字段
      PlayEnd: `${over?'<=':'>'}${year}/${month}/${date}`, //使用JS获取当前时间
      order: "Sort", //默认排序
      page: pageIndex, //当前页数
      count: pageSize //每页条数
    },
    total_count: ''
  }
  return query(param)
}
let _detail = ID => {
  let param = {
    Activity_Activity: {
      ID,//活动ID
      Online: true, //已上线
      IsDelete: false //未删除
    }
  }
  return query(param)
}
export {
  _list,
  _detail
}