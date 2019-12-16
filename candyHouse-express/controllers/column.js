const columnModels = require('../models/column')
const column_goodsModels = require('../models/column_goods')
const goodsModels = require('../models/goods')

const columnController = {
  insert: async function(req,res,next){
    let title = req.body.title;
    let image_url = req.body.image_url
    try{
      await columnModels.insert({image_url,title})
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
    try{
      const column = await columnModels.all()
      res.json({
        code:200,
        data:column
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
      await columnModels.delete(id)
      await column_goodsModels.where({column_id:id}).del()
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
  },
  single: async function(req,res,next){
    let id = req.params.id
    try{
      let infos = await columnModels.single(id)
      let info = infos[0]
      let recommend = await column_goodsModels.where({column_id:id})
      let goods_id = recommend.map(data=>{return data.goods_id})
      let goods = await goodsModels.whereIn('goods.id',goods_id).where({'goods.sold_out':0})
        .leftJoin('category','goods.category_id','category.id')
        .column("*",{'id':'goods.id'},{'name':'goods.name'}, {'category_name':'category.name'})

      res.json({
        code:200,
        data:{
          info,goods
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
    let id = req.params.id;
    let title = req.body.title;
    let image_url = req.body.image_url
    try{
      await columnModels.update(id,{title,image_url})
      res.json({
        code:200,
        message:"修改成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  recommend: async function(req,res,next){
    let column_id = req.params.id
    let goods_id = req.body.goods_id
    try{
      goods_id.forEach(async arr=>{
        let find = await column_goodsModels.where({goods_id:arr,column_id})
        if(!find.length){
          await column_goodsModels.insert({goods_id:arr,column_id})
        }
      })
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
  unRecommend: async function(req,res,next){
    let column_id = req.params.id
    let goods_id = req.body.goods_id
    try{
      goods_id.forEach(async arr=>{
        await column_goodsModels.where({column_id,goods_id:arr}).del()
      })
      res.json({
        code:200,
        message:'删除成功'
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

module.exports = columnController