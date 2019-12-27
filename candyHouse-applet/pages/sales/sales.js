import API from '../../global/request/api.js'

Page({
  data: {
    orderStatus:[
      {id:0,name:'待接单'},
      {id:1,name:'已接单'},
      {id:2,name:'配送中'}
    ],
    status:0,
    order:[]
  },
  onShow(){
    this.getData()
  },
  onPullDownRefresh(){
    this.getData()
  },
  handleRefresh(){
    this.getData()
  },
  changeStatus(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      status:id
    })
    this.getData()
  },
  getData(){
    let id = this.data.status;
    wx.request({
      url: API.wxSales+'/'+id,
      success:res=>{
        this.setData({
          order:res.data.data
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:res=>{
        if(res.statusCode===200){
          wx.stopPullDownRefresh()
        }
      }
    })
  },
  handleSheet(e){
    let id = e.currentTarget.dataset.id;
    let sheetText = '';
    switch (this.data.status){
      case 1:
        sheetText = "配送"
        break;
      case 2:
        sheetText = "完成"
        break;
      default:
        sheetText = "接单"
    }
    wx.showActionSheet({
      itemList: ['查看', sheetText],
      success:(res)=>{
        if(res.tapIndex === 0){
          wx.navigateTo({
            url:'/pages/sales_order/sales_order?id='+id
          })
        }else if(res.tapIndex === 1){
          wx.request({
            url: API.wxSales+'/'+id,
            method:"PUT",
            data:{id,status:this.data.status},
            success:res=>{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              this.getData()
            },
            fail:err=>{
              console.log(err)
            }
          })
        }
      }
    })
  }
})