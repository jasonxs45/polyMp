Component({
  properties: {
    tel: String
  },
  data: {},
  methods: {
    call () {
      wx.makePhoneCall({
        phoneNumber: this.properties.tel
      })
    }
  }
})
