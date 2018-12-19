import { fetch, query } from 'api'
/**==============================
 *           报修投诉
 ==============================*/
//  获取报修分类
let _typelist = () => {
  let param = {
    Repair_Type_list: {
      IsDelete: false,
      order: "Sort",
      field: "ID,Name"
    }
  }
  return query(param)
}
// 用户提交
let _repairsubmit = (TypeID, MemberID, Description, Img) => {
  return fetch(
    'WebApi.ashx?Act=SubmitRepair',
    { TypeID, MemberID, Description, Img }
  )
}
// 用户查询报修列表
let _userlist = (MemberID, status, pageIndex = 1, pageSize = 5) => {
  let param = {
    Repair_Apply_list: {
      MemberID, //条件用户ID
      Status: status, //条件当前状态(待受理,已受理,已完成)
      field: "ID,MemberID,Status,AcceptTime,FinishTime,EvaluateTime,AddTime,Description",
      join: {
        inner_join1: {
          join: "Repair_Type.ID,Repair_Apply.TypeID",
          field: "Name:TypeName"
        },
        inner_join2: {
          join: "Office_Member.ID,Repair_Apply.MemberID",
          field: "Name,Tel"
        },
        inner_join3: {
          join: "Office_Company.ID,Office_Member.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime-",
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 用户查询详情
let _userdetail = ID => {
  let param = {
    Repair_Apply: {
      ID, //报修投诉ID
      join: {
        inner_join1: {
          join: "Repair_Type.ID,Repair_Apply.TypeID",
          field: "Name:TypeName"
        },
        inner_join2: {
          join: "Office_Member.ID,Repair_Apply.MemberID",
          field: "Name,Tel"
        },
        inner_join3: {
          join: "Office_Company.ID,Office_Member.CompanyID",
          field: "Name:CompanyName"
        }
      }
    },
    Repair_Process_list: {
      ApplyID: ID, //报修投诉ID
      order: "addtime-"
    }
  }
  return query(param)  
}
// 用户评价
let _rate = (RepairID,Evaluate1,Evaluate2,Evaluate3,Remark) => {
  return fetch(
    'WebApi.ashx?Act=RepairEvaluate',
    { RepairID, Evaluate1, Evaluate2, Evaluate3, Remark }
  )
}
export {
  _typelist,
  _repairsubmit,
  _userlist,
  _userdetail,
  _rate
}