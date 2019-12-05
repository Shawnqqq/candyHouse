const categoryModels = require('../models/category')

const categoryController = {
  insert: async function(req,res,next){
    let name = req.body.name
    if(!name){
      res.json({
        code:0,
        message:'缺少参数'
      })
    }
    try{
      await categoryModels.insert({name})
      res.json({
        code:200,
        message:"添加成功"
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
      const all = await categoryModels.all()
      res.json({
        code:200,
        data:all
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
    let id  = req.params.id
    let name = req.body.name
    if(!id || !name){
      res.json({
        code:0,
        message:'缺少参数'
      })
    }
    try{
      await categoryModels.update(id,{name})
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
    let id =req.params.id
    try{
      await categoryModels.delete(id)
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

module.exports = categoryController