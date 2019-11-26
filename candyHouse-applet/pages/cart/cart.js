Page({
  data: {
    empty:false,
    orderValue:[],
    all:false
  },
  onLoad: function (options) {

  },
  onChange(e){
    this.setData({
      orderValue: e.detail
    })
  },
  bindAll(){
    let all = !this.data.all
    this.setData({all})
  }
})