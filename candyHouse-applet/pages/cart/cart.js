import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    empty:true,
    cartData:[],
    orderValue:[],
    all:false,
    total:0
  },
  onShow(){
    let id = app.globalData.user_id
    if(id){
      wx.request({
        url:API.wxCart+'/'+id,
        success:res=>{
          if(res.data.code===200){
            if(res.data.data.length){
              this.setData({
                empty:false,
                cartData:res.data.data
              })
              this.calculate()
            }else{
              this.setData({
                empty:true,
                cartData:res.data.data
              })
              this.calculate()
            }
          }else{
            console.log(res.data.message)
          }
        },
        fail:err=>{
          console.log(err)
        }
      })
    }
  },
  onChange(e){
    this.setData({
      orderValue: e.detail
    })
    this.calculate()
  },
  calculate(){
    let cartData = this.data.cartData;
    let orderValue = this.data.orderValue;
    let total = 0;
    orderValue.forEach(data=>{
      let value = cartData.find((item)=>{
        return item.id === data
      })
      if(value){
        let number = value.num * value.price*100
        total += number
      }
    })
    this.setData({
      total
    })
  },
  bindAll(){
    let all = !this.data.all
    let cartData = this.data.cartData
    let orderValue = this.data.orderValue
    if(all){
      cartData.forEach(arr=>{
        orderValue.push(arr.id)
      })
    }else{
      orderValue = []
    }
    this.setData({all,orderValue})
    this.calculate()
  },
  handleReduce(e){
    let cart_id = e.currentTarget.dataset.id
    wx.request({
      url:API.wxCartReduce+'/'+cart_id,
      method:'put',
      success:res=>{
        if(res.data.code ===200){
          this.setData({
            orderValue:[]
          })
          this.onShow()
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  handleAdd(e){
    let cart_id = e.currentTarget.dataset.id
    wx.request({
      url:API.wxCartAdd+'/'+cart_id,
      method:'put',
      success:res=>{
        if(res.data.code ===200){
          this.onShow()
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  handleDelete(){
    let delete_id = this.data.orderValue;
    wx.request({
      url:API.wxCartDel,
      method:'PUT',
      data:{delete_id},
      success:res=>{
        if(res.data.code = 200){
          this.setData({
            orderValue:[]
          })
          this.onShow()
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  handleSubmit(){
    let cartData = this.data.cartData
    let orderValue = this.data.orderValue
    if(!orderValue.length){
      wx.showToast({
        title: '没有选择商品喔',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let order = orderValue.map(data=>{
      return cartData.find((item)=>{
        return item.id === data
      })
    })
    order = JSON.stringify(order)
    wx.navigateTo({
      url: '/pages/order/order?data='+order
    })
  }
})