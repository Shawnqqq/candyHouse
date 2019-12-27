const orderModels = require('../models/order');
const order_skuModels = require('../models/order_sku');
const cartModels = require('../models/cart')
const skuModels = require('../models/sku')
const userModels = require('../models/user');
const {formatTime} = require('../utils/formatDate');

const orderController = {
  insert:async function(req,res,next){
    let user_id = req.body.user_id;
    let total = req.body.total;
    let address_id = req.body.address_id;
    let sku = req.body.sku;
    try{
      await new Promise((resolve,reject)=>{
        sku.forEach(async arr=>{
          let skuStocks = await skuModels.where({id:arr.sku_id})
          let skuStock = skuStocks[0]
          if(skuStock.stock-arr.num < 0){
            reject('fail')
          }else{
            resolve('success')
          }
        })
      })
      let order = Date.now();
      let orderData = await orderModels.return({user_id,address_id,total,status:0,order});
      let orderId = orderData[0];
      sku.map(arr=>{
        arr.order_id = orderId
        return{arr}
      })
      await order_skuModels.insert(sku)
      sku.forEach(async data=>{
        await cartModels.where({user_id,sku_id:data.sku_id}).del();
        await skuModels.where({id:data.sku_id}).decrement('stock',data.num);
      })
      res.json({
        code:200,
        message:"增加成功"
      })
    }catch(err){
      if(err === "fail"){
        res.json({
          code:0,
          message:"库存不足，无法进行"
        })
        return
      }
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  all:async function(req,res,next){
    let id = req.params.id;
    let status = req.query.status;
    try{
      let single = []
      if(status === 'all'){
        single = await orderModels.where({'order.user_id':id})
          .leftJoin('order_sku','order.id','order_sku.order_id')
          .column({'id':'order.id'},'order.total','order.status',{'sku_id':'order_sku.sku_id'})
          .leftJoin('sku','order_sku.sku_id','sku.id')
          .column('sku.name','sku.image_url')
          .orderBy('id','desc')
      }else{
        single = await orderModels.where({'order.user_id':id,'order.status':status})
          .leftJoin('order_sku','order.id','order_sku.order_id')
          .column({'id':'order.id'},'order.total','order.status',{'sku_id':'order_sku.sku_id'})
          .leftJoin('sku','order_sku.sku_id','sku.id')
          .column('sku.name','sku.image_url')
          .orderBy('id','desc')
      }
      res.json({
        code:200,
        data:single
      })
    }catch(err){
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
  },
  delete: async function(req,res,next){
    let id = req.params.id
    try{
      let checks = await orderModels.single(id)
      let check = checks[0]
      if(check.status !== '0'){
        res.json({
          code:0,
          message:"该单已被商家接单"
        })
        return
      }
      await orderModels.delete(id)
      await order_skuModels.where({order_id:id}).del()
      res.json({
        code:200,
        message:"取消成功"
      })
    }catch(err){
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  salesDelete: async function(req,res,next){
    let id = req.params.id
    try{
      await orderModels.delete(id);
      await order_skuModels.where({order_id:id}).del();
      res.json({
        code:200,
        message:"取消成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  userOrder : async function(req,res,next){
    let id = req.params.id
    try{
      let order = await orderModels.where({user_id:id})
      let user = await userModels.single(id)
      res.json({
        code:200,
        data:{
          order,user:user[0]
        }
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  sales: async function(req,res,next){
    let status = req.params.id
    try{
      let sales = await orderModels.where({'order.status':status})
        .leftJoin('address','order.address_id','address.id')
        .column('*',{'id':'order.id'},{'user_id':'order.user_id'})
        .orderBy('order.created_time',"desc")
      const salesData = await Promise.all(
        sales.map(async arr=>{
          arr.created_time = formatTime(arr.created_time)
          let sku = await order_skuModels.where({'order_sku.order_id':arr.id})
          arr.num = sku.length
          return arr
        })
      )
      res.json({
        code:200,
        data:salesData
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  further: async function(req,res,next){
    let id = req.params.id;
    let status = req.body.status;
    try{
      status = Number(status)
      await orderModels.single(id).update({status:status+1})
      res.json({
        code:200,
        message:"修改成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  }
}

module.exports = orderController