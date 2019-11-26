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
  onLoad: function (options) {

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
        this.setData({ info })
      }
    })
  },
  sumbitAddress(){
    let info = this.data.info
    if(!info.name){
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
      console.log('success!')
    }
  }
})