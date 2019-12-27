import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    login:false,
    userInfo:{},
    user_id:"",
    statistics:{},
    salesman:0
  },
  onLoad: function (options) {
    this.getData()
  },
  onShow(){
    let user_id = app.globalData.user_id;
    if(user_id){
      wx.request({
        url: API.wxUserOrder+'/'+user_id,
        success:res=>{
          let data = res.data.data.order.map(data=>{
            return data.status
          })
          let statistics = data.reduce(function(prev,next){ 
            prev[next] = (prev[next] + 1) || 1;
            return prev; 
          },{});
          this.setData({
            statistics,
            salesman:res.data.data.user.salesman
          })
        }
      })
    }
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