const landing_pageModels = require('../models/landing_page')
const categoryModels = require('../models/category')
const goodsModels = require('../models/goods')

const pathOptionsController = {
  all:async function(req,res,next){
    try{
      let landingData = await landing_pageModels.all()
      let landing = landingData.map(arr =>{
        return{ value:arr.id,label: arr.title }
      })
      let category = await categoryModels.all()
      let goods = await goodsModels.all()
      let goodsOptions = []
      category.forEach(arr =>{
        let options = { value:arr.id,label:arr.name,children:[]}
        goods.forEach(data =>{
          if(data.category_id == options.value){
            options.children.push({value:data.id,label:data.name})
          }
        })
        goodsOptions.push(options)
      })
      res.json({
        code:200,
        data:{
          landing,goodsOptions
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

module.exports = pathOptionsController