import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    goodsId:'',
    loading:true,
    show:false,
    current:1,
    goodsData:{},
    sku: [],
    skuIndex:0,
    skuCurrent:{},
    skuNum:1,
    cartNum:0
  },
  onLoad: function (options) {
    let id = options.id
    this.setData({
      goodsId:id
    })
  },
  onShow(){
    let id = this.data.goodsId
    wx.request({
      url:API.wxgoods+'/'+id,
      success:res=>{
        this.setData({
          goodsData:res.data.data.goods,
          sku:res.data.data.sku
        })
        let index = this.data.skuIndex
        this.setData({
          skuCurrent:this.data.sku[index]
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
    this.cartNum()
  },
  cartNum(){
    let id = app.globalData.user_id
    if(id){
      wx.request({
        url:API.wxCart+'/'+id,
        success:res=>{
          this.setData({
            cartNum:res.data.data.length
          })
        },
        fail:err=>{
          console.log(err)
        }
      })
    }
  },
  handleSwiper(e){
    let current = e.detail.current+1
    this.setData({
      current
    })
  },
  onEditorReady(){
    wx.createSelectorQuery().select('#product-editor').context(res => {
      res.context.setContents({
        html: this.data.goodsData.content
      })
    }).exec()
  },
  handlereturn(){
    wx.navigateBack({
      delta: 1
    })
  },
  sheetClose(){
    this.setData({ show: false });
  },
  sheetShow(){
    this.setData({ show: true });
  },
  changeSKU(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      skuIndex:index,
      skuCurrent:this.data.sku[index]
    })
  },
  changeNum(e){
    this.setData({
      skuNum: e.detail
    })
  },
  addCart(){
    if(this.data.goodsData.sold_out!=="0"){
      wx.showToast({
        title: '该商品已下架',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.skuCurrent.stock <= "0"){
      wx.showToast({
        title: '该商品已售空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let user_id = app.globalData.user_id
    if(!user_id){
      wx.showModal({
        content: '您未登录喔，是否登录',
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my'
            })
          }
        }
      })
      return
    }
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url:API.wxCart,
      method:'POST',
      data:{
        user_id,
        sku_id:this.data.skuCurrent.id,
        num:this.data.skuNum
      },
      success:res=>{
        if(res.data.code === 200){
          this.cartNum()
          wx.hideLoading()
        }else{        
          console.log(res.data.message)
        }
      },
      fail:err=>{
        console.log(err)
        wx.hideLoading()
      }
    })
  }
})