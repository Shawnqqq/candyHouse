import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    orderSelected:'all',
    orderCategory:[
      {id:'all',name:"全部"},
      {id:0,name:'待接单'},
      {id:1,name:'已接单'},
      {id:2,name:'配送中'},
      {id:3,name:'已送达'}
    ],
    orderData:[]
  },
  onLoad(options){
    let id = options.id
    this.setData({
      orderSelected:id
    })
    this.getData()
  },
  changeSelected(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      orderSelected:id
    })
    this.getData()
  },
  getData(){
    let id = app.globalData.user_id;
    let status = this.data.orderSelected;
    wx.request({
      url: API.wxOrderStatus+'/'+id,
      data:{status},
      success:res=>{
        res.data.data.forEach((data,index,arr)=>{
          switch (data.status){
            case "1":
              data.status = "已接单"
              break;
            case "2":
              data.status = "配送中"
              break
            case "3":
              data.status = "已送达"
              break
            default :
              data.status = "待接单"
          }
          let arr_id = arr.map(data=>{
            return data.id
          })
          let num = arr_id.reduce(function(prev,next,index){ 
            prev[next] = (prev[next] + 1) || 1;
            return prev; 
          },{});
          let id = data.id
          data.num = num[id]
        })
        let orderData = [];
        res.data.data.forEach((item) =>{
          let lock = orderData.map(data =>{return data.id}).indexOf(item.id);
          if(lock < 0) orderData.push(item)
        })
        this.setData({
          orderData
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
})