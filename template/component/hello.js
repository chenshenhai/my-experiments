Page({

  data: {
    title: '这是一个测试组件',
    subTitle: 'Hello Component',
    list: [0, 1, 2, 3, 4, 5],
    type: '1',
  },

  onReady() {
    console.log('onReady...')
  },

  onLoad() {
    console.log('onLoad...')
  },

  myClickAction: function() {
    this.setData({ title: "Hello World" })
  }
})