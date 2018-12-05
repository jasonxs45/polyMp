const conMain = {
  id: '1',
  img: '../conference/cs.jpg',
  name: 'P1+P2会议室1',
  figure: '可容纳150人',
  address: '武汉市洪山区关山大道322号保利国',
  text: [
    { title: '空间设施', html: '<p>P4会议室占地总面积达100平方，位于保利国际中心35楼。商务空间可容纳25人，是决策会议、策略会议的绝佳场地。 满足您的创意交流/研讨培训/大型报告、举办路演、发布会、公司年会/主题演讲、观影、小型话剧/脱口秀等一系列需求。</p>' },
    { title: '提供服务', html: '<p>配备投影仪显示系统、会议扩声系统。会议集控系统完善，会议室隔音效果好。</p><p>提供电梯内外屏会议通知、独立专用VIP电梯直达会议场所、演讲台、茶水供应、中央空调开放、WiFi全区域覆盖、停车场地等服务（节假日提供特别服务）</p>' }
  ]
}
Page({
  data: {
    conAll: '',
    conMain
  },
  onLoad (options) {
    console.log(options)
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onShareAppMessage () {}
})