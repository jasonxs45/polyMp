const banners = ['https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-1?wid=1068&hei=640&fmt=png-alpha&.v=1536171355016',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-3?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396227637',
  'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-4?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396223232'
]
const list = [
  {
    icon: 'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-section1-holiday-201811?wid=564&hei=516&fmt=png-alpha&qlt=80&.v=1540674991315',
    name: '访客预约'
  },
  {
    icon: 'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-1?wid=1068&hei=640&fmt=png-alpha&.v=1536171355016',
    name: '会务预约'
  },
  {
    icon: 'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-3?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396227637',
    name: '电子放行单'
  },
  {
    icon: 'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-gallery-2018-4?wid=2000&hei=1536&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1535396223232',
    name: '报修投诉'
  },
  {
    icon: 'https://store.storeimages.cdn-apple.com/8755/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-section1-holiday-201811?wid=564&hei=516&fmt=png-alpha&qlt=80&.v=1540674991315',
    name: '积分商城'
  }
]
const app = getApp()
Page({
  data: {
    banners,
    list
  },
  onLoad() {
  }
})