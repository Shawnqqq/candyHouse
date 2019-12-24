import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    categoryId:0,
    category: [],
    loading:true,
    goodsData:[]
  },
  onLoad: function (options) {
    if(options.id){
      this.setData({
        categoryId:Number(options.id)
      })
    }
  },
  onShow(){
    wx.request({
      url: API.wxCategory,
      success:res=>{
        res.data.data.unshift({id:0,name:"推荐"})
        this.setData({
          category:res.data.data
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
    this.getData()
  },
  changeCategory(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      categoryId:id,
      loading:true
    })
    this.getData()
  },
  getData(){
    let id = this.data.categoryId
    if(id===0){
      wx.request({
        url:API.wxRecommend,
        success:res=>{
          this.setData({
            goodsData:res.data.data
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
    }else{
      wx.request({
        url:API.wxCategory+"/"+id,
        success:res=>{
          this.setData({
            goodsData:res.data.data
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
    }
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