import { fetch, query } from 'api'
/**==========================
 *         电子放行单
 ==========================*/
//  租户提交
let _usersubmit = (ID = 0, MemberID, Goods, OrderTime, Remark) => {
  return fetch(
    'WebApi.ashx?Act=AddERelease',
    { ID, MemberID, Goods, OrderTime, Remark }
  )
}
// 租户列表
let _userlist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    ERelease_Apply_list: {
      MemberID, //企业会员ID
      join: {
        inner_join: {
          join: "Office_Company.ID,ERelease_Apply.CompanyID",
          field: "Name:CompanyName"
        },
        inner_join2: {
          join: "Office_Member.ID,ERelease_Apply.MemberID",
          field: "Name:MemberName,Tel"
        }
      },
      field: "ID,MemberID,OrderTime,Status,AddTime",
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 企业待审核列表
let _companylist = (CompanyID, pageIndex = 1, pageSize = 5) => {
  let param = {
    ERelease_Apply_list: {
      CompanyID, //参数  当前用户企业ID
      Status: "待企业审核",
      join: {
        inner_join: {
          join: "Office_Company.ID,ERelease_Apply.CompanyID",
          field: "Name:CompanyName"
        },
        inner_join2: {
          join: "Office_Member.ID,ERelease_Apply.MemberID",
          field: "Name:MemberName,Tel"
        }
      },
      field: "ID,MemberID,OrderTime,Status,AddTime",
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 企业已审核列表
let _companypasslist = (CompanyAuditorID, pageIndex = 1, pageSize = 5) => {
  let param = {
    ERelease_Apply_list: {
      CompanyAuditorID, //参数 当前用户ID
      Status: "!=待企业审核",
      join: {
        inner_join: {
          join: "Office_Company.ID,ERelease_Apply.CompanyID",
          field: "Name:CompanyName"
        },
        inner_join2: {
          join: "Office_Member.ID,ERelease_Apply.MemberID",
          field: "Name:MemberName,Tel"
        }
      },
      field: "ID,MemberID,OrderTime,Status,AddTime",
      order: "AddTime-",
      IsDelete: false,
      page: 1,
      count: 5
    },
    total_count: ''
  }
  return query(param)
}
// 区管列表
let _managerlist = (pageIndex = 1, pageSize = 5) => {
  let param = {
    ERelease_Apply_list: {
      Status: "待区管审核",
      join: {
        inner_join: {
          join: "Office_Company.ID,ERelease_Apply.CompanyID",
          field: "Name:CompanyName"
        },
        inner_join2: {
          join: "Office_Member.ID,ERelease_Apply.MemberID",
          field: "Name:MemberName,Tel"
        }
      },
      field: "ID,MemberID,OrderTime,Status,AddTime",
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 查询详情
let _detail = ID => {
  let param = {
    ERelease_Apply: {
      ID, //放行申请单ID
      join: {
        inner_join: {
          join: "Office_Company.ID,ERelease_Apply.CompanyID",
          field: "Name:CompanyName"
        },
        inner_join2: {
          join: "Office_Member.ID,ERelease_Apply.MemberID",
          field: "Name:MemberName,Tel"
        }
      }
    }
  }
  return query(param)
}
// 审核
let _handle = (MemberID, EReleaseID, Remark, Result, PassImg) => {
  return fetch(
    'WebApi.ashx?Act=CheckERelease',
    { MemberID, EReleaseID, Remark, Result, PassImg }
  )
}
// 保安扫码查询
let _analysiscode = Code => {
  return fetch(
    'WebApi.ashx?Act=ScanEReleaseQR',
    { Code }
  )
}
export {
  _usersubmit,
  _userlist,
  _companylist,
  _companypasslist,
  _managerlist,
  _detail,
  _handle,
  _analysiscode
}