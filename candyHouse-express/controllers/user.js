const userModels = require('../models/user');
const addressModels = require('../models/address')
const orderModels = require('../models/order');
const {formatTime} = require('../utils/formatDate');

const userController = {
  all: async function(req,res,next){
    let nickname = req.query.nickname;
    let pageSize = req.query.pageSize || 10 
    let nowPage = req.query.nowPage || 1
    let offset = (nowPage-1)*pageSize
    let params = {};
    if(nickname) params.nickname = nickname;
    try{
      const User = await userModels.where(params)
        .offset(offset)
        .limit(pageSize)
        .orderBy('id','desc')
      let totals = await userModels.where(params)
      let total  = totals.length;
      res.json({
        code:200,
        data:User,
        total
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
    let id = req.params.id;
    try{
      let userDatas = await userModels.single(id)
      let userData = userDatas[0]
      let status = userData.salesman
      if(status){
        await userModels.single(id).update({salesman:0})
      }else{
        await userModels.single(id).update({salesman:1})
      }
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
  single: async function(req,res,next){
    let id = req.params.id
    try{
      let userInfos = await userModels.single(id)
      let userInfo = userInfos[0]
      const address = await addressModels.where({user_id:id});
      let order = await orderModels.where({user_id:id}).orderBy('id','desc');
      order.forEach(arr=>{
        arr.created_time = formatTime(arr.created_time)
      })
      res.json({
        code:200,
        data:{
          userInfo,
          address,
          order
        }
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

module.exports = userController