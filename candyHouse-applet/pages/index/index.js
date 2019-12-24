import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    swiperData:[],
    classifyData:[],
    posterData:[],
    columnData:[]
  },
  onLoad(){
    this.getData()
  },
  getData(){
    wx.request({
      url:API.banner,
      success:res=>{
        this.setData({
          swiperData:res.data.data
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
    wx.request({
      url:API.wxClassify,
      success:res=>{
        this.setData({
          classifyData:res.data.data
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
    wx.request({
      url:API.wxPoster,
      success:res=>{
        this.setData({
          posterData:res.data.data
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
    wx.request({
      url:API.wxColumn,
      success:res=>{
        this.setData({
          columnData:res.data.data
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  handleCart(e){
    let id = e.currentTarget.dataset.id
    app.addCart(id).then(res=>{
      wx.showToast({
        title: res,
        icon: 'none',
        duration: 2000
      })
    })
  }
})
