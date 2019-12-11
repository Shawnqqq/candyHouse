const landing_pageModels = require('../models/landing_page')
const landing_page_recommendModels = require('../models/landing_page_recommend')
const goodsModels = require('../models/goods')
const {formatDate} = require('../utils/formatDate');

const landing_pageController = {
  insert: async function(req,res,next){
    let title = req.body.title;
    let content = req.body.content;
    let color = req.body.color;
    try{
      await landing_pageModels.insert({title,content,color})
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
      let data = await landing_pageModels.all()
      data.forEach(arr=>{
        arr.created_time = formatDate(arr.created_time)
      })
      res.json({
        code:200,
        data
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
    let title = req.body.title;
    let content = req.body.content;
    let color = req.body.color;
    if(!id || !title ||!content ||!color){
      res.json({
        code:0,
        message:"参数缺少"
      })
      return
    }
    try{
      await landing_pageModels.update(id,{title,content,color})
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
  single: async function(req,res,next){
    let id = req.params.id
    try{
      let infos = await landing_pageModels.single(id)
      infos.forEach(arr=>{
        arr.created_time = formatDate(arr.created_time)
      })
      let info = infos[0]
      let recommend = await landing_page_recommendModels.where({page_id:id})
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
  recommend: async function(req,res,next){
    let page_id = req.params.id
    let goods_id = req.body.goods_id
    try{
      goods_id.forEach(async arr=>{
        let find = await landing_page_recommendModels.where({goods_id:arr,page_id})
        if(!find.length){
          await landing_page_recommendModels.insert({goods_id:arr,page_id})
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
    let page_id = req.params.id
    let goods_id = req.body.goods_id
    try{
      goods_id.forEach(async arr=>{
        await landing_page_recommendModels.where({page_id,goods_id:arr}).del()
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
  },
  deleted: async function(req,res,next){
    let id = req.params.id
    try{
      await landing_pageModels.delete(id)
      await landing_page_recommendModels.where({page_id:id}).del()
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

module.exports = landing_pageController