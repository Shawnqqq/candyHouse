var express = require('express');
var router = express.Router();

const middleAuth = require('../middleauth/middleAuth')
const authController = require('../controllers/anth');
const qiniuController = require('../controllers/qiniu');
const managerController = require('../controllers/manager')
const categoryController = require('../controllers/category')
const goodsController = require('../controllers/goods')
const recommendController = require('../controllers/recommend')
const landing_pageController = require('../controllers/landing')
const pathOptionsController = require('../controllers/pathOptions')
const bannerController = require('../controllers/banner')
const posterController = require('../controllers/poster')
const classifyController = require('../controllers/classify')
const columnController = require('../controllers/column')
const orderController = require('../controllers/order')
const userController = require('../controllers/user')
const wxIndexController = require('../controllers/wxIndex')
const wxCategoryController = require('../controllers/wxCategory')
const wxLandingController = require('../controllers/wxLanding')
const wxGoodsController = require('../controllers/wxGoods')
const wxOrderController = require('../controllers/wxOrder')
const wxcartController = require('../controllers/wxCart')
const wxAddressController = require('../controllers/wxAddress')
const dashboardController = require('../controllers/dashboard')

// 登录
router.post('/authLogin',authController.login)
router.post('/wxauth/login',authController.wxLogin)

// 七牛云
router.get('/qiniu',qiniuController.upload)

// 管理员接口
router.get('/manager',middleAuth,managerController.all);
router.get('/manager/:id',middleAuth,managerController.single);
router.post('/manager',middleAuth,managerController.insert);
router.put('/manager/:id',middleAuth,managerController.update);
router.delete('/manager/:id',middleAuth,managerController.delete);
// 分类接口
router.get('/category',middleAuth,categoryController.all)
router.post('/category',middleAuth,categoryController.insert)
router.put('/category/:id',middleAuth,categoryController.update)
router.delete('/category/:id',middleAuth,categoryController.delete)
// 商品与SKU接口
router.post('/goods',middleAuth,goodsController.insert)
router.get('/goods',middleAuth,goodsController.all)
router.get('/goods/:id',middleAuth,goodsController.single)
router.put('/goods/soldOut/:id',middleAuth,goodsController.soldOut)
router.put('/goods/sold/:id',middleAuth,goodsController.sold)
router.put('/goods/:id',middleAuth,goodsController.update)
router.delete('/goods/:id',middleAuth,goodsController.delete)
// 推荐商品
router.post('/recommend',middleAuth,recommendController.insert)
router.get('/recommend',middleAuth,recommendController.all)
router.put('/recommend',middleAuth,recommendController.delete)
// 活动页
router.post('/landing',middleAuth,landing_pageController.insert)
router.get('/landing',middleAuth,landing_pageController.all)
router.put('/landing/:id',middleAuth,landing_pageController.update)
router.get('/landing/:id',middleAuth,landing_pageController.single)
router.post('/landingGoods/:id',middleAuth,landing_pageController.recommend)
router.put('/landingGoods/:id',middleAuth,landing_pageController.unRecommend)
router.delete('/landing/:id',middleAuth,landing_pageController.deleted)
// 路径选项
router.get('/pathOptions',middleAuth,pathOptionsController.all)
// 轮播图
router.post('/banner',middleAuth,bannerController.insert)
router.get('/banner',middleAuth,bannerController.all)
router.delete('/banner/:id',middleAuth,bannerController.delete)
// 海报页
router.post('/poster',middleAuth,posterController.insert)
router.get('/poster',middleAuth,posterController.all)
router.delete('/poster/:id',middleAuth,posterController.delete)
// 推荐分类
router.post('/classify',middleAuth,classifyController.insert)
router.get('/classify',middleAuth,classifyController.all)
router.delete('/classify/:id',middleAuth,classifyController.delete)
router.get('/classify/:id',middleAuth,classifyController.single)
router.put('/classify/:id',middleAuth,classifyController.update)
// 合辑管理
router.post('/column',middleAuth,columnController.insert)
router.get('/column',middleAuth,columnController.all)
router.delete('/column/:id',middleAuth,columnController.delete)
router.get('/column/:id',middleAuth,columnController.single)
router.put('/column/:id',middleAuth,columnController.update)
router.post('/columnGoods/:id',middleAuth,columnController.recommend)
router.put('/columnGoods/:id',middleAuth,columnController.unRecommend)
// 订单管理
router.get('/order',middleAuth,orderController.all)
router.delete('/order/:id',middleAuth,orderController.delete)
router.get('/order/:id',middleAuth,orderController.single)
// 用户管理
router.get('/user',middleAuth,userController.all)
router.put('/user/:id',middleAuth,userController.update)
router.get('/user/:id',middleAuth,userController.single)
// 概论页
router.get('/index',middleAuth,dashboardController.data)


// 小程序接口
// 首页数据
router.get('/wxBanner',wxIndexController.bannerAll)
router.get('/wxClassify',wxIndexController.classifyAll)
router.get('/wxPoster',wxIndexController.posterAll)
router.get('/wxColumn',wxIndexController.columnAll)
// 分类数据
router.get('/wxCategory',wxCategoryController.category)
router.get('/wxRecommend',wxCategoryController.recommend)
router.get('/wxCategory/:id',wxCategoryController.single)
// 活动页
router.get('/wxLanding/:id',wxLandingController.landing)
// 商品页
router.get('/wxGoods/:id',wxGoodsController.single)
// 购物车
router.post('/wxCart',wxcartController.insert)
router.post('/wxCartQuick',wxcartController.quick)
router.get('/wxCart/:id',wxcartController.single)
router.put('/wxCartReduce/:id',wxcartController.reduce)
router.put('/wxCartAdd/:id',wxcartController.add)
router.put('/wxCartDel',wxcartController.delete)
// 收货地址
router.post('/wxAddress',wxAddressController.insert)
router.get('/wxAddress/:id',wxAddressController.single)
router.get('/wxOrderAddress/:id',wxAddressController.default)
router.put('/wxAddress/:id',wxAddressController.update)
router.delete('/wxAddress/:id',wxAddressController.delete)
// 订单
router.post('/wxOrder',wxOrderController.insert)
router.get('/wxOrderStatus/:id',wxOrderController.all)
router.get('/wxOrder/:id',wxOrderController.single)
router.delete('/wxOrder/:id',wxOrderController.delete)
router.get('/wxUserOrder/:id',wxOrderController.userOrder)
// 销售管理
router.get('/wxSales/:id',wxOrderController.sales)
router.put('/wxSales/:id',wxOrderController.further)
router.delete('/wxSales/:id',wxOrderController.salesDelete)

module.exports = router;
