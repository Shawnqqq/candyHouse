const banner_indexModels = require('../models/banner_index')
const classify_indexModels = require('../models/classify_index')
const poster_indexModels = require('../models/poster_index')
const columnModels = require('../models/column')
const column_goodsModels = require('../models/column_goods')
const goodsModels = require('../models/goods')

const wxIndexController = {
  bannerAll: async function(req,res,next){
    try{
      const bannerData = await banner_indexModels.all()
      res.json({
        code:200,
        data:bannerData
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  classifyAll: async function(req,res,next){
    try{
      const classifyData = await classify_indexModels.all()
      res.json({
        code:200,
        data:classifyData
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  posterAll: async function(req,res,next){
    try{
      const posterAll = await poster_indexModels.all()
      res.json({
        code:200,
        data:posterAll
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  columnAll: async function(req,res,next){
    try{
      let column = await columnModels.all()
      const columnData = await Promise.all(
        column.map(async data=>{
          let column_goods = await column_goodsModels.where({column_id:data.id})
          let goods_id = column_goods.map(arr => {return arr.goods_id})
          let goods = await goodsModels.whereIn('goods.id',goods_id).where({'goods.sold_out':0})
          data.goods = goods
          return{ data }
        })
      )
      res.json({
        code:200,
        data:columnData
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

module.exports = wxIndexController
