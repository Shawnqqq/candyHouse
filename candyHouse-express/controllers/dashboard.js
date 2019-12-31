const orderModels = require('../models/order');
const userModels = require('../models/user'); 
const {formatDate} = require('../utils/formatDate');

const dashboardController = {
  data:async function(req,res,next){
    try{
      const User = await userModels.all();
      let order = await orderModels.all().orderBy('id',"desc");
      let today = formatDate(new Date());
      let todayOrder = [];
      order.forEach(arr=>{
        arr.created_time = formatDate(arr.created_time);
        arr.created_time === today ? todayOrder.push(arr) : '';
      })
      res.json({
        code:200,
        data:{
          user:User.length,
          order:order.length,
          todayOrderNum:todayOrder.length,
          todayOrder
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

module.exports = dashboardController

