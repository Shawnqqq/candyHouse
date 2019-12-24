import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    info:{
      name:'',
      sex:"1",
      phone:"",
      location:{},
      desc:'',
      tag:'',
      default:true
    }
  },
  changeSex(e){
    let info = this.data.info
    info.sex = e.detail
    this.setData({ info })
  },
  changeName(e){
    let info = this.data.info
    info.name = e.detail
    this.setData({ info })
  },
  changePhone(e){
    let info = this.data.info
    info.phone = e.detail
    this.setData({ info })
  },
  changeDesc(e){
    let info = this.data.info
    info.desc = e.detail
    this.setData({ info })
  },
  changeTag(e){
    let info = this.data.info
    info.tag = e.currentTarget.dataset.value
    this.setData({
      info
    })
  },
  changeDefault({ detail }){
    let info = this.data.info
    info.default = detail
    this.setData({ info })
  },
  onMap(){
    wx.chooseLocation({
      success:res=>{
        let info = this.data.info
        info.location = res
        console.log(info)
        this.setData({ info })
      },
      fail:()=>{
        wx.getSetting({
          success (res) {               
            !res.authSetting['scope.userLocation'] && wx.showModal({
              content: '您暂未开启权限，是否开启',
              confirmColor: '#72bd4a',
              success: res => {              
                if (res.confirm) {
                  wx.openSetting({
                    success(res){
                      console.log(!!res.authSetting['scope.userLocation'] ? '设置成功' : '设置失败');
                    },
                  });
                }
              }
            });
          }
        });
      }
    })
  },
  sumbitAddress(){
    let info = this.data.info
    let user_id = app.globalData.user_id
    if(!user_id){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }else if(!info.name){
      wx.showToast({
        title: '请填写收货人名字',
        icon: 'none',
        duration: 1500
      })
    }else if(!info.phone){
      wx.showToast({
        title: '请填写收货人手机号',
        icon: 'none',
        duration: 1500
      })
    }else if(!(/^1[3456789]\d{9}$/.test(info.phone))){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 1500
      })
    }else if(!info.location.name){
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        duration: 1500
      })
    }else if(!info.desc){
      wx.showToast({
        title: '请填写的楼号/单位/门牌号',
        icon: 'none',
        duration: 1500
      })
    }else if(!info.tag){
      wx.showToast({
        title: '请选择你的地址标签',
        icon: 'none',
        duration: 1500
      })
    }else{
      let params = {
        user_id,
        name:info.name,
        sex:info.sex,
        phone:info.phone,
        location:info.location.address,
        address:info.location.name,
        description:info.desc,
        latitude:info.location.latitude,
        longitude:info.location.longitude,
        tag:info.tag,
        default:info.default
      }
      wx.request({
        url: API.wxAddress,
        method:"POST",
        data:params,
        success:res=>{
          if(res.data.code===200){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
            wx.navigateTo({ url: '/pages/address/address' })
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
    }
  }
})