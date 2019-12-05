const goodsModels = require('../models/goods')
const skuModels = require('../models/sku')

const goodsController = {
  insert:async function(req,res,next){
    let name = req.body.name
    let description = req.body.description
    let category_id = req.body.category_id
    let price = req.body.price
    let price_origin = req.body.price_origin
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
        .column("*",{'name':'goods.name'}, {'category_name':'category.name'})
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
  }
}

module.exports = goodsController
