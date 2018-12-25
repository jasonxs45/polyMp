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
// 前台获取访客申请列表
let _visitorlist = (comID, pageIndex = 1, pageSize = 5) => {
  let CompanyID
  if (comID !==0 && !comID) {
    CompanyID = ''
  } else {
    CompanyID = comID
  }
  let param = {
    Visit_Apply_list: {
      CompanyID, //当前用户企业ID
      join: {
        inner_join: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      field: "ID,Name,Tel,VisitTime,InviteName,InviteTel",
      Status: "待审核",
      Type: "申访",
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 访客审核
let _audit = (ID, MemberID, Result) => {
  return fetch(
    'WebApi.ashx?Act=Visit_ApplyCheck',
    { ID, MemberID, Result }
  )
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
// 租户邀访提交
let _invitesubmit = (MemberID, Name, Tel, VisitTime, Remark, Number) => {
  return fetch(
    'WebApi.ashx?Act=Invitation',
    { MemberID, Name, Tel, VisitTime, Remark, Number }
  )
}
// 租户邀访记录
let _invitelist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Apply_list: {
      InviteMemberID: MemberID, //参数租户会员ID
      Type: "邀访",
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
      page: pageIndex, //当前页码
      count: pageSize //每页数量
    },
    total_count: ''
  }
  return query(param)
}
export {
  _visitorsubmit,
  _visitapplylist,
  _visitreceivedlist,
  _contactorlist,
  _delcontactor,
  _invitesubmit,
  _invitelist,
  _visitorlist,
  _audit
}