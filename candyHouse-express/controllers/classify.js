const classify_indexModels = require('../models/classify_index')

const classifyController = {
  insert: async function(req,res,next){
    let title = req.body.title;
    let category_id = req.body.category_id;
    let image_url = req.body.image_url;
    try{
      await classify_indexModels.insert({title,category_id,image_url})
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
      const classify = await classify_indexModels.all()
        .leftJoin("category","classify_index.category_id","category.id")
        .column("*",{'id':'classify_index.id'})
      res.json({
        code:200,
        data:classify
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
      await classify_indexModels.delete(id)
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
      const classifySingle = await classify_indexModels.single(id)
      res.json({
        code:200,
        data:classifySingle[0]
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
    let category_id = req.body.category_id;
    let image_url = req.body.image_url;
    if(!id || !title || !category_id || !image_url){
      res.json({
        code:0,
        message:"缺少参数"
      })
      return
    }
    try{
      await classify_indexModels.update(id,{title,category_id,image_url})
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
  }
}

module.exports = classifyController