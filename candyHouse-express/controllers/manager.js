const managerModels = require('../models/manager')

const managerController = {
  insert:async function(req,res,next){
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let status = 1
    if(!name || !phone || !password){
      res.json({
        code:0,
        message:"缺少参数"
      })
      return
    }
    try{
      await managerModels.insert({name,phone,password,status})
      res.json({
        code:200,
        message:'添加成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  all:async function(req,res,next){
    try{
      const all = await managerModels.all()
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
  update:async function(req,res,next){
    let id = req.params.id
    let name = req.body.name
    let phone = req.body.phone
    let password = req.body.password;
    if(!name || !phone || !password || !id){
      res.json({
        code:0,
        message:"缺少参数"
      })
      return
    }
    try{
      await managerModels.update(id,{name,phone,password})
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
  single:async function(req,res,next){
    let id = req.params.id
    try{
      let singles = await managerModels.single(id)
      let single = singles[0]
      res.json({
        code:200,
        data:single
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  delete:async function(req,res,next){
    let id = req.params.id;
    try{
      await managerModels.delete(id)
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

module.exports = managerController