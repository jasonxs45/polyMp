import { fetch, query } from 'api'
/**==============================
 *           注册会员
 ==============================*/
//  获取写字楼列表
let _getBuildingList = () => {
  let param = {
    Office_Building_list: {
      IsDelete: false,
      order: "Sort",
      field: "ID,Name"
    }
  }
  return query(param)
}
// 根据id获取公司列表
let _getCompanyList = BuildingID => {
  let param = {
    Office_Company_list: {
      IsDelete: false,
      order: "Sort",
      BuildingID,//条件：写字楼ID
      field: "ID,BuildingID,Name,Level"
    }
  }
  return query(param)
}
// 获取验证码
let _getCode = (Phone, Type) => {
  return fetch(
    'WebApi.ashx?Act=SendSmsCode',
    { Phone, Type}
  )
}
// 注册
let _regist = opt => {
  let { UnionID, Type, Company, Code, Name, Phone } = opt
  return fetch(
    'WebApi.ashx?Act=Register',
    { UnionID, Type, Company, Code, Name, Phone }
  )
}
// 查询待审核租户
let _registlist = (pageIndex = 1, pageSize = 5) => {
  let param = {
    Office_MemberApply_list: {
      Status: "待审核",
      join: {
        inner_join1: {
          join: "Office_Member.ID,Office_MemberApply.MemberID",
          field: "Name:MemberName,Tel"
        },
        inner_join2: {
          join: "Office_Company.ID,Office_MemberApply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime",
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 审核 拒绝或者通过
let _audit = (ID, UnionID, Result) => {
  return fetch(
    'WebApi.ashx?Act=CheckMemberApply',
    { ID, UnionID, Result }
  )
}
// 签到领取红包
let _redenvelope = UnionID => {
  return fetch(
    'WebApi.ashx?Act=GetRedPacket',
    {
      UnionID
    }
  )
}
export {
  _getCode,
  _regist,
  _getBuildingList,
  _getCompanyList,
  _registlist,
  _audit,
  _redenvelope
}