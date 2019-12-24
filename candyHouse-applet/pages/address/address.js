import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    addressData:[],
    orderLock:false
  },
  onLoad(){
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('orderAddress',()=>{
      this.setData({
        orderLock:true
      })
    })
  },
  onShow(){
    let user_id = app.globalData.user_id;
    if(user_id){
      wx.request({
        url: API.wxAddress+'/'+user_id,
        success:res=>{
          this.setData({
            addressData:res.data.data
          })
        },
        fail:err=>{
          console.log(err)
        }
      })
    }
  },
  handleDelete(e){
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '是否删除',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: API.wxAddress+"/"+id,
            method:'DELETE',
            success:res=>{
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
              this.onShow()
            }
          })
        }
      }
    })
  },
  changeAddress(e){
    if(e.detail === "cell" && this.data.orderLock){
      let id = e.currentTarget.dataset.id
      wx.request({
        url: API.wxAddress+"/"+id,
        method:"PUT",
        success:res=>{
          if(res.data.code!==200){
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
      wx.navigateBack({
        delta:1
      })
    }
  }
})