Page({
  data: {
    banner: "<p><img src='https://m.360buyimg.com/babel/s1242x1644_jfs/t1/71214/30/15912/435909/5dd672c8Ee1b9e51d/b5273096272381f4.jpg!q70.dpg'></p>",
    backColor:"#ffc056",
    loading:false
  },
  onLoad: function (options) {

  },
  onEditorReady() {
    wx.createSelectorQuery().select('#column-editor').context(res => {
      res.context.setContents({
        html: this.data.banner
      })
    }).exec()
  },
})