import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    orderData:[],
    total:0,
    address:false
  },
  onLoad: function (options) {
    let orderData = JSON.parse(options.data)
    let total = 0
    orderData.forEach(arr=>{
      let number = arr.num * arr.price
      total += number
    })
    total = total.toFixed(2)
    this.setData({
      orderData,total
    })
  },
  onShow(){
    this.getAddress()
  },
  getAddress(){
    let id = app.globalData.user_id
    wx.request({
      url: API.wxOrderAddress+'/'+id,
      success:res=>{
        this.setData({
          address:res.data.data[0]
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  changeAddress(){
    wx.navigateTo({
      url: '/pages/address/address',
      success:res=>{
        res.eventChannel.emit('orderAddress')
      }
    })
  },
  handleSubmit(){
    let address = this.data.address
    if(!address){
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let user_id = app.globalData.user_id;
    let total = this.data.total;
    let address_id = address.id;
    let sku = this.data.orderData.map(arr=>{
      return{
        sku_id:arr.id,
        num:arr.num
      }
    })
    wx.request({
      url: API.wxOrder,
      method:'POST',
      data:{
        user_id,total,address_id,sku
      },
      success:res=>{
        console.log(res.data.message)
      }
    })
  }
})