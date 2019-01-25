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
// 客服获取报修列表
let _managerlist = (Status, pageIndex = 1, pageSize = 5) => {
  let param = {
    Repair_Apply_list: {
      Status, //条件 工单状态  （待受理、待回复、已完成）
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
// 处理人获取报修列表 处理中
let _handlinglist = (UnionID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Repair_Apply_list: {
      Status: "处理中",
      field: "ID,MemberID,Status,AcceptTime,FinishTime,EvaluateTime,AddTime,StaffID",
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
        },
        inner_join4: {
          join: "SYS_Staff.ID,Repair_Apply.StaffID"
        },
        inner_join5: {
          join: "WeChat_Fans.ID,SYS_Staff.FansID",
          UnionID //参数 当前用户UnionID
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
// 处理人获取报修列表 已完成
let _handledlist = (UnionID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Repair_Apply_list: {
      field: "ID,MemberID,Status,AcceptTime,FinishTime,EvaluateTime,AddTime,StaffID",
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
      ID_in: {
        field: "Repair_Process.ApplyID",
        join: {
          inner_join1: {
            join: "SYS_Staff.ID,Repair_Process.StaffID"
          },
          inner_join2: {
            join: "WeChat_Fans.ID,SYS_Staff.FansID",
            UnionID //参数 当前用户UnionID
          }
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
// 查询处理人列表
let _handlers = () => {
  let param = {
    SYS_Manager_list: {
      IsDelete: false,
      order: "Sort",
      field: "StaffID",
      Type: "报修处理人",
      join: {
        inner_join: {
          join: "SYS_Staff.ID,SYS_Manager.StaffID",
          field: "Name,Tel"
        }
      }
    }
  }
  return query(param)
}
//  管理员和处理人查询报修单详情
let _handledetail = id => {
  let param = {
    Repair_Apply: {
      ID: id,
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
      ApplyID: id,
      order: "addtime-"
    }
  }
  return query(param)
}
// 客服受理工单
let _managerHandle = (UnionID, RepairID, StaffID, Content, ImgList) => {
  return fetch(
    'WebApi.ashx?Act=RepairAcceptance',
    { UnionID, RepairID, StaffID, Content, ImgList }
  )
}
// 处理人转派工单
let _handlerRepost = (UnionID, RepairID, StaffID, Content, ImgList) => {
  return fetch(
    'WebApi.ashx?Act=RepairOperation',
    { UnionID, RepairID, StaffID, Content, ImgList }
  )
}
// 处理人处理完成
let _handlerDone = (UnionID, RepairID, Content, ImgList) => {
  return fetch(
    'WebApi.ashx?Act=CompleteAcceptance',
    { UnionID, RepairID, Content, ImgList }
  )
}
// 客服回复请求
let _managerReply = (UnionID, RepairID, Content, ImgList) => {
  return fetch(
    'WebApi.ashx?Act=RepairReply',
    { UnionID, RepairID, Content, ImgList }
  )
}
export {
  _typelist,
  _repairsubmit,
  _userlist,
  _userdetail,
  _rate,
  _managerlist,
  _handlinglist,
  _handledlist,
  _handlers,
  _handledetail,
  _managerHandle,
  _handlerRepost,
  _handlerDone,
  _managerReply
}