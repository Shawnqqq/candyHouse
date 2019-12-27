import API from '../../global/request/api.js'

Page({
  data:{
    orderInfo:{},
    skuData:[],
    longitude:'',
    latitude:'',
    submitText:'',
    markers:[
      {
        id:1,
        longitude:'',
        latitude:'',
        iconPath:'/image/goods_location.png',
        label:{
          content:"我的位置",
          color:"#006400"
        }
      },
      {
        id:2,
        longitude:'',
        latitude:'',
        iconPath:'/image/my_location.png',
        label:{
          content:"目标位置",
          color:"#006400"
        }
      }
    ],
    polyline:[
      {
        points:[
          {        
            longitude:'',
            latitude:''
          },
          {
            longitude:'',
            latitude:'',
          }
        ],
        color:"#FF4500",
        width:2,
        dottedLine:true,
        arrowLine:true
      }
    ]
  },
  onLoad(options){
    let id = options.id;
    wx.request({
      url: API.wxOrder+'/'+id,
      success:res=>{
        let submitText = ''
        switch (res.data.data.order.status){
          case '1':
            submitText = "配送"
            break;
          case '2':
            submitText = "完成"
            break;
          default:
            submitText = "接单"
        }
        this.setData({
          orderInfo:res.data.data.order,
          skuData:res.data.data.sku,
          submitText
        })
      }
    })
  },
  onShow(){
    wx.getLocation({
      success:res=>{
        let markers = this.data.markers;
        let polyline = this.data.polyline;
        markers[0].longitude = res.longitude;
        markers[0].latitude = res.latitude;
        markers[1].longitude = this.data.orderInfo.longitude;
        markers[1].latitude = this.data.orderInfo.latitude;
        polyline[0].points[0].longitude = res.longitude;
        polyline[0].points[0].latitude = res.latitude;
        polyline[0].points[1].longitude = this.data.orderInfo.longitude;
        polyline[0].points[1].latitude = this.data.orderInfo.latitude;
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude,
          markers,polyline
        })
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
  handleCancel(){
    wx.showModal({
      title: '是否确定取消该订单',
      success:res=>{
        if (res.confirm) {
          let id = this.data.orderInfo.id;
          wx.request({
            url: API.wxSales+'/'+id,
            method:'DELETE',
            success:res=>{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              if(res.data.code === 200){
                wx.navigateTo({
                  url:'/pages/sales/sales'
                })
              }
            }
          })
        }
      }
    })
  }, 
  handleSubmit(){
    wx.showModal({
      title: '是否确定'+this.data.submitText,
      success:(res)=>{
        if (res.confirm) {
          let id = this.data.orderInfo.id;
          wx.request({
            url: API.wxSales+'/'+id,
            method:"PUT",
            data:{id,status:this.data.orderInfo.status},
            success:res=>{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
              if(res.data.code === 200){
                wx.navigateTo({
                  url:'/pages/sales/sales'
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
  }
})