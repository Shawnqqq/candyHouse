const recommendModels = require('../models/recommend')
const goodsModels = require('../models/goods')

const recommendController = {
  insert: async function(req,res,next){
    let ids = req.body.id
    try{
      ids.forEach(async arr=>{
        let find = await recommendModels.where({goods_id:arr})
        if(!find.length){
          await recommendModels.insert({goods_id:arr})
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
  all: async function(req,res,next){
    try{
      let recommend = await recommendModels.all()
      let ids = recommend.map(data=>{return data.goods_id})
      let data = await goodsModels.whereIn('goods.id',ids).where({'goods.sold_out':0})
        .leftJoin('category','goods.category_id','category.id')
        .column("*",{'id':'goods.id'},{'name':'goods.name'}, {'category_name':'category.name'})
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
  delete: async function(req,res,next){
    let ids = req.body.id
    try{
      ids.forEach(async arr=>{
        await recommendModels.where({goods_id:arr}).del()
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

module.exports = recommendController