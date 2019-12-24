const addressModels = require('../models/address')

const wxAddressController = {
  insert:async function(req,res,next){
    let user_id = req.body.user_id;
    let name = req.body.name;
    let sex = req.body.sex;
    let phone = req.body.phone;
    let location = req.body.location;
    let address= req.body.address;
    let description = req.body.description;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let tag = req.body.tag;
    let selected = req.body.default;
    try{
      if(selected){
        await addressModels.all().update({default:false})
      }
      await addressModels.insert({user_id,name,sex,phone,location,address,
        description,latitude,longitude,tag,default:selected})
      res.json({
        code:200,
        message:"增加成功"
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  single:async function(req,res,next){
    let id = req.params.id
    try{
      const single = await addressModels.where({user_id:id})
      res.json({
        code:200,
        data:single
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  default: async function(req,res,next){
    let id = req.params.id
    try{
      const data = await addressModels.where({user_id:id,default:1})
      res.json({
        code:200,
        data
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  update: async function(req,res,next){
    let id = req.params.id
    try{
      await addressModels.all().update({default:false})
      await addressModels.single(id).update({default:true})
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
  },
  delete: async function(req,res,next){
    let id =req.params.id
    try{
      await addressModels.delete(id)
      res.json({
        code:200,
        message:"删除成功"
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

module.exports = wxAddressController