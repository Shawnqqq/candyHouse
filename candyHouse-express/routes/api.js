var express = require('express');
var router = express.Router();

const managerController = require('../controllers/manager')
const authController = require('../controllers/anth');

// 登录
router.post('/authLogin',authController.login)

// 管理员接口
router.get('/manager',managerController.all);
router.get('/manager/:id',managerController.single);
router.post('/manager',managerController.insert);
router.put('/manager/:id',managerController.update);
router.delete('/manager/:id',managerController.delete);

module.exports = router;
