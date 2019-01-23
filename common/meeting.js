import { fetch, query } from 'api'
/**==========================
 *           会务预约
 ==========================*/
//  会议室列表
let _roomlist = () => {
  var param = {
    Meeting_Room_list: {
      IsDelete: false,
      order: "Sort",
      field: "ID,Name,Img,Floor,Area,DeskType,MaxNum,AdvanceDays,Sort,AddTime,IsDelete,Online,Price,AMTime,PMTime"
    }
  }
  return query(param)
}
//  会议室详情
let _detail = id => {
  let param = {
    Meeting_Room: {
      ID: id //参数  会议室ID
    }
  }
  return query(param)
}
//  查询可预约日期
let _dates = ID => {
  return fetch(
    'WebApi.ashx?Act=GetMeetingDate',
    { ID }
  )
}
// 提交
let _submit = (RoomID, MemberID, Name, Tel, Remark, TimeList) => {
  return fetch(
    'WebApi.ashx?Act=ReserveMeeting',
    { RoomID, MemberID, Name, Tel, Remark, TimeList}
  )
}
// 订单列表
let _orderlist = (MemberID, pageIndex = 1, pageSize = 6) => {
  let param = {
    Meeting_Apply_list: {
      MemberID, //条件 用户MemberID
      IsDelete: false,
      order: "AddTime-",
      join: {
        inner_join: {
          join: "Meeting_Room.ID,Meeting_Apply.RoomID",
          field: "Name:RoomName"
        }
      },
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 订单详情
let _orderdetail = ID => {
  let param = {
    Meeting_Apply: {
      ID, //参数 预约单ID
      IsDelete: false,
      join: {
        inner_join: {
          join: "Meeting_Room.ID,Meeting_Apply.RoomID",
          field: "Name:RoomName"
        }
      }
    }
  }
  return query(param)
}
export {
  _roomlist,
  _detail,
  _dates,
  _submit,
  _orderlist,
  _orderdetail
}