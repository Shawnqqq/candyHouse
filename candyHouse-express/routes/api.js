var express = require('express');
var router = express.Router();

const middleAuth = require('../middleauth/middleAuth')
const authController = require('../controllers/anth');
const qiniuController = require('../controllers/qiniu');
const managerController = require('../controllers/manager')
const categoryController = require('../controllers/category')
const goodsController = require('../controllers/goods')

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


module.exports = router;
