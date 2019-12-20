const app = getApp()

Page({
  data: {
    login:false,
    userInfo:{},
    user_id:""
  },
  onLoad: function (options) {
    this.getData()
  },
  getData(){
    let userInfo = app.globalData.userInfo
    let user_id = app.globalData.user_id
    if (userInfo && user_id) {
      this.setData({
        login: true,
        userInfo,
        user_id
      })
    }
  },
  login(){
    app.login().then(res=>{
      if(res === "success"){
        this.getData()
      }
    })
  }
})