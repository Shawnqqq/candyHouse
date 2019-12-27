import API from '../../global/request/api.js'

Page({
  data: {
    orderInfo:{},
    skuData:[]
  },
  onLoad: function (options) {
    let id = options.id
    wx.request({
      url: API.wxOrder+'/'+id,
      success:res=>{
        let data = res.data.data
        switch (data.order.status){
          case "1":
            data.order.status = "已接单"
            data.order.statustips = "您的订单已接单，请等待配送"
            break;
          case "2":
            data.order.status = "配送中"
            data.order.statustips = "您的订单配送中，请留意来电"
            break
          case "3":
            data.order.status = "已送达"
            data.order.statustips = "您的订单配送中，祝您购物愉快"
            break
          default :
            data.order.status = "待接单"
            data.order.statustips = "您的订单待接单，请等待商家接单"
        }
        this.setData({
          orderInfo:data.order,
          skuData:data.sku
        })
      }
    })
  },
  handleSell(){
    wx.makePhoneCall({
      phoneNumber: '13112808045'
    })
  },
  handleDelete(){
    wx.showModal({
      title: '是否取消该订单',
      success (res) {
        if (res.confirm) {
          let id = this.data.orderInfo.id
          wx.request({
            url: API.wxOrder+'/'+id,
            method:'DELETE',
            success:res=>{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              if(res.data.code===200){
                wx.switchTab({
                  url: '/pages/my/my'
                })
              }
            }
          })
        }
      }
    })
  }
})