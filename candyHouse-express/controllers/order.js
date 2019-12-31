const orderModels = require('../models/order');
const order_skuModels = require('../models/order_sku');
const {formatTime} = require('../utils/formatDate');

const orderController = {
  all: async function(req,res,next){
    let order = req.query.order;
    let status = req.query.status;
    let pageSize = req.query.pageSize || 10 
    let nowPage = req.query.nowPage || 1
    let offset = (nowPage-1)*pageSize
    let params = {};
    if(order) params.order = order;
    if(status) params.status = status;
    try{
      let order = await orderModels.where(params)
        .offset(offset)
        .limit(pageSize)
        .orderBy('created_time',"desc")
      order.forEach(arr=>{
        arr.created_time = formatTime(arr.created_time)
      })
      let totals = await orderModels.where(params);
      let total = totals.length;
      res.json({
        code:200,
        data:order,
        total
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id
    try{
      await orderModels.delete(id);
      await order_skuModels.where({order_id:id}).del()
      res.json({
        code:200,
        message:"删除成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  single: async function(req,res,next){
    let id = req.params.id
    try{
      let order = await orderModels.where({'order.id':id})
        .leftJoin('address','order.address_id','address.id')
        .column('*',{'id':'order.id'})
      order.forEach(arr=>{
        arr.created_time = formatTime(arr.created_time)
      })
      let sku = await order_skuModels.where({'order_sku.order_id':id})
        .leftJoin('sku','order_sku.sku_id','sku.id')
        .column('order_sku.num',{'sku_id':'sku.id'},'sku.name','sku.image_url','sku.price','sku.goods_id')
        .leftJoin('goods','sku.goods_id','goods.id')
        .column({'goods_id':'goods.id'},{'title':'goods.name'})
      res.json({
        code:200,
        data:{
          order:order[0],
          sku
        }
      })
    }catch(err){
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  }
}

module.exports = orderController