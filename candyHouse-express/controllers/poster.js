const poster_indexModels = require('../models/poster_index')

const posterController = {
  insert: async function(req,res,next){
    let image_url = req.body.image_url;
    let page_path = req.body.page_path;
    let options_array = req.body.options;
    try{
      let options = JSON.stringify(options_array)
      await poster_indexModels.insert({image_url,page_path,options})
      res.json({
        code:200,
        message:'增加成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  all: async function(req,res,next){
    try{
      let data = await poster_indexModels.all()
      data.forEach(arr=>{
        arr.options = JSON.parse(arr.options)
      })
      res.json({
        code:200,
        data
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id
    try{
      await poster_indexModels.delete(id)
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

module.exports = posterController