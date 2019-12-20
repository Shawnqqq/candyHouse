const goodsModels = require('../models/goods')
const skuModels = require('../models/sku')

const wxGoodsController = {
  single: async function(req,res,next){
    let id = req.params.id
    try{
      let goodsDatas = await goodsModels.single(id)
      let goodsData = goodsDatas[0]
      goodsData.banner = JSON.parse(goodsData.banner)
      const skuData = await skuModels.where({goods_id:id})
      res.json({
        code:200,
        data:{
          goods:goodsData,
          sku:skuData
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

module.exports = wxGoodsController