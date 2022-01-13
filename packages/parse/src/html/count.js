ModuleConfig({
  data: {
    count: 0,
  },

  onReady() {
    console.log('onReady...')
  },


  myClickAction() {
    const count = this.data.count + 1;
    this.setData({ count })
  },

  onLoad() {
    console.log('onLoad...')
  },
})