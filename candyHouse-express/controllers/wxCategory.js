const categoryModels = require('../models/category')
const recommendModels = require('../models/recommend')
const goodsModels = require('../models/goods')

const wxCategoryController ={
  category:async function(req,res,next){
    try{
      const categoryData = await categoryModels.all()
      res.json({
        code:200,
        data:categoryData
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  recommend:async function(req,res,next){
    try{
      const recommend = await recommendModels.all()
        .leftJoin('goods','recommend.goods_id','goods.id')
        .where({'goods.sold_out':0})
        .column('*',{'id':'goods.id'})
      res.json({
        code:200,
        data:recommend
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
      const single = await goodsModels.where({category_id:id,sold_out:0})
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
  }
}

module.exports = wxCategoryController