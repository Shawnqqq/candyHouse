import API from '../../global/request/api.js'

Page({
  data: {
    landingData:{},
    loading:true,
    landingId:""
  },
  onLoad: function (options) {
    this.setData({
      landingId:options.id
    })
  },
  onShow(){
    let id = this.data.landingId
    wx.request({
      url:API.wxLanding+"/"+id,
      success:res=>{
        this.setData({
          landingData:res.data.data
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:res=>{
        if(res.statusCode===200){
          this.setData({
            loading:false
          })
        }
      }
    })
  },
  onEditorReady() {
    wx.createSelectorQuery().select('#column-editor').context(res => {
      res.context.setContents({
        html: this.data.landingData.content
      })
    }).exec()
  }
})