const goodsModels = require('../models/goods')
const skuModels = require('../models/sku')

const goodsController = {
  insert:async function(req,res,next){
    let name = req.body.name
    let description = req.body.description
    let category_id = req.body.category_id
    let price = req.body.price
    let price_origin = req.body.price_origin || null
    let bannerArray = req.body.banner
    let content = req.body.content
    let image_url = req.body.image_url
    let sku = req.body.sku
    if(!name || !description || !category_id || !price || !bannerArray || 
    !content || !image_url || !sku){
      res.json({
        code:0,
        message:"缺少参数"
      })
    }
    try{
      bannerArray = bannerArray.map(arr =>{ return {url:arr.url} })
      let banner = JSON.stringify(bannerArray)
      let goods_ids = await goodsModels.return({name,description,category_id,price,price_origin,banner,content,
      image_url})
      let goods_id = goods_ids[0]
      
      sku.forEach(async data=>{
        await skuModels.insert({name:data.name,image_url:data.image_url,price:data.price,stock:data.stock,goods_id})
      })
      res.json({
        code:200,
        message:'增加成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  all: async function(req,res,next){
    let category_id = req.query.category_id
    let pageSize = req.query.pageSize || 10 
    let nowPage = req.query.nowPage || 1
    let offset = (nowPage-1)*pageSize
    let params = {}
    if(category_id){ params = {'goods.category_id':category_id} }
    try{
      let goods = await goodsModels.where(params)
        .leftJoin('category','goods.category_id','category.id')
        .column("*",{'id':'goods.id'},{'name':'goods.name'}, {'category_name':'category.name'})
        .offset(offset)
        .limit(pageSize)
      let total = goods.length;
      res.json({
        code:200,
        data:goods,
        total
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  soldOut: async function(req,res,next){
    let id = req.params.id
    try{
      await goodsModels.update(id,{sold_out:1})
      res.json({
        code:200,
        message:"下架成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  sold: async function(req,res,next){
    let id = req.params.id
    try{
      await goodsModels.update(id,{sold_out:0})
      res.json({
        code:200,
        message:"上架成功"
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
      let goodsArray = await goodsModels.single(id)
      let goods = goodsArray[0]
      goods.banner = JSON.parse(goods.banner)
      let goods_id = goods.id
      let sku = await skuModels.where({goods_id})
      res.json({
        code:200,
        data:{
          goods,
          sku
        }
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  update: async function(req,res,next){
    let id = req.params.id
    let name = req.body.name
    let description = req.body.description
    let category_id = req.body.category_id
    let price = req.body.price
    let price_origin = req.body.price_origin
    let bannerArray = req.body.banner
    let content = req.body.content
    let image_url = req.body.image_url
    let sku = req.body.sku
    let deleteSku = req.body.deleteSku
    if(!name || !description || !category_id || !price || !bannerArray || 
    !content || !image_url || !sku || !id){
      res.json({
        code:0,
        message:"缺少参数"
      })
    }
    try{
      bannerArray = bannerArray.map(arr =>{ return {url:arr.url} })
      let banner = JSON.stringify(bannerArray)
      await goodsModels.update(id,{name,description,category_id,price,price_origin,banner,content,image_url})

      sku.forEach(async data=>{
        if(data.id !== false){
          await skuModels.update(data.id,{name:data.name,image_url:data.image_url,price:data.price,stock:data.stock})
        }else{
          await skuModels.insert({name:data.name,image_url:data.image_url,price:data.price,stock:data.stock,goods_id:id})
        }
      })

      deleteSku.forEach(async arr=>{
        await skuModels.delete(arr)
      })
      res.json({
        code:200,
        message:'修改成功'
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
    let id = req.params.id
    try{
      await goodsModels.delete(id)
      await skuModels.where({goods_id:id}).del()
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

module.exports = goodsController
