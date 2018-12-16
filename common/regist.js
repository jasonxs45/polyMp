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
let _getCode = Phone => {
  return fetch(
    'WebApi.ashx?Act=SendSmsCode',
    {
      Phone
    }
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
export {
  _getCode, _regist, _getBuildingList, _getCompanyList
}