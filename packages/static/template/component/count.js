Page({
  data: {
    count: 0,
  },

  onReady() {
    console.log('onReady...')
  },

  onLoad() {
    console.log('onLoad...')
  },

  myClickAction: function() {
    const count = this.data.count + 1;
    this.setData({ count })
  }
})