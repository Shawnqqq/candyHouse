const cartModels = require('../models/cart')
const skuModels = require('../models/sku')

const cartController = {
  insert: async function(req,res,next){
    let user_id = req.body.user_id;
    let sku_id = req.body.sku_id;
    let num = req.body.num;
    try{
      let cart = await cartModels.where({user_id,sku_id})
      if(cart[0]){
        let id = cart[0].id
        await cartModels.single(id).increment('num',num)
      }else{
        await cartModels.insert({user_id,sku_id,num})
      }
      res.json({
        code:200,
        message:"增加成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  quick: async function(req,res,next){
    let user_id = req.body.user_id;
    let goods_id = req.body.goods_id;
    try{
      let skuArray = await skuModels.where({goods_id})
      let sku = skuArray[0]
      if(!sku){
        res.json({
          code:0,
          message:"该商品缺少SKU"
        })
        return
      }
      if(sku.stock==="0"){
        res.json({
          code:0,
          message:"商品已售空"
        })
        return
      }
      let cart = await cartModels.where({user_id,sku_id:sku.id})
      if(cart[0]){
        let id = cart[0].id
        await cartModels.single(id).increment('num',1)
      }else{
        await cartModels.insert({user_id,sku_id:sku.id,num:1})
      }
      res.json({
        code:200,
        message:"增加成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  single: async function(req,res,next){
    let id = req.params.id
    try{
      const cartData = await cartModels.where({'cart.user_id':id})
        .leftJoin('sku','cart.sku_id','sku.id')
        .column({'id':'cart.sku_id'},'cart.num','sku.name','sku.image_url','sku.price',
          'sku.goods_id','sku.stock',{'cart_id':'cart.id'})
        .leftJoin('goods','sku.goods_id','goods.id')
        .column({'title':'goods.name'},'goods.sold_out')

      cartData.forEach(async arr=>{
        if(!arr.name){
          await cartModels.where({sku_id:arr.id}).del()
        }
      })
      res.json({
        code:200,
        data:cartData
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  reduce: async function(req,res,next){
    let id = req.params.id
    try{
      await cartModels.single(id).decrement('num',1)
      let carts = await cartModels.single(id)
      let cart = carts[0]
      if(cart.num === 0){
        await cartModels.delete(id)
      }
      res.json({
        code:200,
        message:"减少成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  add: async function(req,res,next){
    let id = req.params.id
    try{
      await cartModels.single(id).increment('num',1)
      res.json({
        code:200,
        message:"增加成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  delete: async function(req,res,next){
    let array = req.body.delete_id;
    try{
      array.forEach(async arr=>{
        await cartModels.where({sku_id:arr}).del()
      })
      res.json({
        code:200,
        message:"删除成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  }
}

module.exports = cartController