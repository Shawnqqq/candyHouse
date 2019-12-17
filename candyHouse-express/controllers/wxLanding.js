const landing_pageModels = require('../models/landing_page')
const landing_page_recommendModels = require('../models/landing_page_recommend')
const goodsModels = require('../models/goods')

const wxLandingController ={
  landing:async function(req,res,next){
    let id = req.params.id
    try{
      let landings = await landing_pageModels.single(id)
      let landing = landings[0]
      let landing_recommend = await landing_page_recommendModels.where({'page_id':landing.id})
      let goods_id = landing_recommend.map(arr=> {return arr.goods_id})
      let goods = await goodsModels.whereIn('goods.id',goods_id).where({'goods.sold_out':0})
      landing.goods = goods
      res.json({
        code:200,
        data:landing
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

module.exports = wxLandingController