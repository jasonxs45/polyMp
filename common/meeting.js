import { fetch, query } from 'api'
/**==========================
 *         用户会务预约
 ==========================*/
//  筛选的项目
let _filter = () => {
  let param = {
    Meeting_Room_distinct_ext: {
      IsDelete: false,
      Online: true,
      order: "Sort",
      field: "RoomType"
    }
  }
  return query(param)
}
//  会议室列表
let _roomlist = () => {
  var param = {
    Meeting_Room_list: {
      IsDelete: false,
      order: "Sort",
      field: "ID,Name,Img,Floor,Area,DeskType,MaxNum,RoomType,AdvanceDays,Sort,AddTime,IsDelete,Online,Price,AMTime,PMTime"
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
    { RoomID, MemberID, Name, Tel, Remark, TimeList }
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
        inner_join1: {
          join: "Meeting_Room.ID,Meeting_Apply.RoomID",
          field: "Name:RoomName,Img"
        },
        inner_join2: {
          join: "Office_Member.ID,Meeting_Apply.MemberID",
          field: "Type,CompanyID"
        },
        left_join: {
          join: "Office_Company.ID,Office_Member.CompanyID",
          field: "Name:CompanyName"
        }
      }
    }
  }
  return query(param)
}
// 支付接口
let _pay = (UnionID, ID) => {
  return fetch(
    'WebApi.ashx?Act=PayMeetingApply',
    {
      UnionID,
      ID
    }
  )
}
/**==========================
 *       管理员会务预约
 ==========================*/
//  查询列表
let _auditlist = (status, pageIndex, pageSize) => {
  let param = {
    Meeting_Apply_list: {
      IsDelete: false,
      order: "AddTime-",
      Status: status, //状态包括(待审核、待支付、已完成、已取消)
      join: {
        inner_join: {
          join: "Meeting_Room.ID,Meeting_Apply.RoomID",
          field: "Name:RoomName"
        }
      },
      page: pageIndex, //当前页码
      count: pageSize //每页条数
    },
    total_count: ""
  }
  return query(param)
}
// 取消订单
let _cancel = (ID, UnionID) => {
  return fetch(
    'WebApi.ashx?Act=CancelApply',
    {
      ID,
      UnionID
    }
  )
}
// 审核通过
let _audit = (ID, UnionID) => {
  return fetch(
    'WebApi.ashx?Act=CheckApply',
    {
      ID,
      UnionID
    }
  )
}
// 确定支付
let _confirmPay = (ID, UnionID, PayType) => {
  return fetch(
    'WebApi.ashx?Act=MeetingApplyPay',
    {
      ID,
      UnionID,
      PayType
    }
  )
}
// 编辑订单
let _modify = (ID, UnionID, RoomID, Remark, TimeList, ItemList, OrderAmount) => {
  return fetch(
    'WebApi.ashx?Act=UptMeetingApply',
    {
      ID,
      UnionID,
      RoomID,
      Remark,
      TimeList,
      ItemList,
      OrderAmount
    }
  )
}
// 申请开票
let _invoice = opt => {
  let {
    ID,
    InvoiceType,
    InvoiceName,
    InvoiceNumber,
    InvoiceAddress,
    InvoicePhone,
    InvoiceBank,
    InvoiceAccount
  } = opt
  return fetch(
    'WebApi.ashx?Act=OpenInvoice',
    {
      ID,
      InvoiceType,
      InvoiceName,
      InvoiceNumber,
      InvoiceAddress,
      InvoicePhone,
      InvoiceBank,
      InvoiceAccount
    }
  )
}
export {
  _filter,
  _roomlist,
  _detail,
  _dates,
  _submit,
  _orderlist,
  _orderdetail,
  _pay,
  _auditlist,
  _cancel,
  _audit,
  _confirmPay,
  _modify,
  _invoice
}