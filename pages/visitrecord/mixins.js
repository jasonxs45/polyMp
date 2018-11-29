export const tabs = [
  {
    role: '访客',
    text: '发出的申请'
  },
  {
    role: '访客',
    text: '收到的邀访'
  },
  {
    role: '员工',
    text: '发出的邀访'
  },
  {
    role: '员工',
    text: '常用联系人'
  }
]
export function tabChange(e) {
  let currentIndex = parseInt(e.detail.value)
  this.setData({
    currentIndex
  })
}