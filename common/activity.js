import { fetch, query } from 'api'
/**==========================
 *           活动
 ==========================*/
//  首页活动列表
let _homelist = () => {
  let param = {
    Activity_Activity_list: {
      Online: true, //已上线
      IsDelete: false, //未删除
      field: "ID,Name,SmallImg,ApplyEnd,PlayEnd,Sort", //查询字段
      PlayEnd: ">#time_now",
      order: "Sort", //默认排序
      top: 2 //首页只显示6条
    }
  }
  return query(param)
}
// 活动列表
let _list = (over, MemberID, pageIndex = 1, pageSize = 5) => {
  let playend = ''
  let order = 'Sort'//默认排序
  if (over === 'over') {
    playend = '<#time_now'
    order = 'PlayEnd-'
  } 
  if (over === 'unover') {
    playend = '>#time_now'
  }
  let param = {
    Activity_Activity_list: {
      Online: true, //已上线
      IsDelete: false, //未删除
      field: "ID,Name,SmallImg,ApplyEnd,PlayEnd,Sort", //查询字段
      field_ApplyID: {
        field: "Activity_Apply.ID.max",
        ActivityID: "link#Activity_Activity.ID",
        MemberID  //参数 当前用户ID
      },
      PlayEnd: playend, //使用JS获取当前时间
      order, 
      page: pageIndex, //当前页数
      count: pageSize //每页条数
    },
    total_count: ''
  }
  return query(param)
}
// 活动详情
let _detail = ID => {
  let param = {
    Activity_Activity: {
      ID,//活动ID
      IsDelete: false, //未删除
      //获取已报名人数 增加以下尚需经
      field_ApplyCount: {
        field: "Activity_Apply.ID.count",
        ActivityID: ID
      }
    }
  }
  return query(param)
}
let _submit = (MemberID, ActivityID) => {
  return fetch(
    'WebApi.ashx?Act=ActivitySign',
    { MemberID, ActivityID }
  )
}
// 我的活动列表
let _mylist = (MemberID, pageIndex = 1, pageSize = 3) => {
  let param = {
    Activity_Apply_list: {
      MemberID, //条件参数 会员MemberID
      order: "AddTime-",
      field: "ID,SignIn,AddTime",
      page: pageIndex,
      count: pageSize,
      join: {
        inner_join: {
          join: "Activity_Activity.ID,Activity_Apply.ActivityID",
          field: "Name,SmallImg,ApplyEnd,PlayEnd"
        }
      }
    },
    total_count: ''
  }
  return query(param)
}
// 我的已报名活动
let _mydetail = (ID, MemberID) => {
  let param = {
    Activity_Apply: {
      ID, //报名记录ID
      MemberID //会员ID
    },
    Activity_Activity: {
      ID: "from#Activity_Apply.ActivityID",
      field_ApplyCount: {
        field: "Activity_Apply.ID.count",
        ActivityID: "from#Activity_Apply.ActivityID"
      }
    }
  }
  return query(param)
}
// 活动签到
let _sign = (SN, UnionID) => {
  return fetch(
    'WebApi.ashx?Act=ApplySign',
    {SN, UnionID}
  )
}
export {
  _list,
  _homelist,
  _detail,
  _submit,
  _mylist,
  _mydetail,
  _sign
}