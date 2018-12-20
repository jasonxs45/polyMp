import { fetch, query } from 'api'
/**==========================
 *         来访系统
 ==========================*/
//  访客提交
let _visitorsubmit = (MemberID, CompanyID, InviteName, InviteTel, VisitTime, Remark, Number) => {
  return fetch(
    'WebApi.ashx?Act=ApplyVisit',
    { MemberID, CompanyID, InviteName, InviteTel, VisitTime, Remark, Number }
  )
}
// 访客申请列表
let _visitapplylist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Apply_list: {
      MemberID, //条件 会员ID
      Type: '申访',
      join: {
        inner_join1: {
          join: "Office_Building.ID,Visit_Apply.BuildingID",
          field: "Name:BuildingName"
        },
        inner_join2: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 访客收到列表
let _visitreceivedlist = (Tel, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Apply_list: {
      Tel, //参数  访客手机号码
      Type: '邀访',
      join: {
        inner_join1: {
          join: "Office_Building.ID,Visit_Apply.BuildingID",
          field: "Name:BuildingName"
        },
        inner_join2: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 常用联系人
let _contactorlist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Contacts_list: {
      MemberID, //用户MemberID
      join: {
        left_join1: {
          join: "Office_Building.ID,Visit_Contacts.BuildingID",
          field: "Name:BuildingName"
        },
        left_join2: {
          join: "Office_Company.ID,Visit_Contacts.CompanyID",
          field: "Name:CompanyName"
        }
      },
      IsDelete: false,
      page: pageIndex, //页码
      count: pageSize //每页数量
    },
    total_count: ''
  }
  return query(param)
}
// 删除常用联系人
let _delcontactor = (MemberID, ContactsID) => {
  return fetch(
    'WebApi.ashx?Act=DeleteContacts',
    { MemberID, ContactsID }
  )
}
 _visitapplylist
export {
  _visitorsubmit,
  _visitapplylist,
  _visitreceivedlist,
  _contactorlist,
  _delcontactor
}