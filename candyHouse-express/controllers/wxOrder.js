const orderModels = require('../models/order');
const order_skuModels = require('../models/order_sku');

const orderController = {
  insert:async function(req,res,next){
    let user_id = req.body.user_id;
    let total = req.body.total;
    let address_id = req.body.address_id;
    let sku = req.body.sku;
    try{
      let order = Date.now();
      let orderData = await orderModels.return({user_id,address_id,total,status:0,order});
      let orderId = orderData[0];
      sku.map(arr=>{
        arr.order_id = orderId
        return{arr}
      })
      await order_skuModels.insert(sku)
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
  }
}

module.exports = orderController