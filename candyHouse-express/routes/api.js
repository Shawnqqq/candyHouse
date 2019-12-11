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

// 登录
router.post('/authLogin',authController.login)

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

module.exports = router;
