const managerModels = require('../models/manager')
const authcode = require('../utils/authcode')

const authController = {
  login: async function(req,res,next){
    let phone = req.body.phone;
    let password = req.body.password;
    if(!phone || !password){
      res.json({
        code:0,
        message:"缺少参数"
      })
      return
    }
    try{
      let manager = await managerModels.where({phone,password})
      if(manager.length === 0){
        res.json({
          code:0,
          message:"手机号或密码错误"
        })
        return
      }
      let encryption = manager[0].phone+'/t'+manager[0].name+'/t'+manager[0].id
      let token = authcode(encryption,'INCODE')
      res.json({
        code:200,
        data:{
          name:manager[0].name,
          status:manager[0].status,
          token,
        }
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

module.exports = authController