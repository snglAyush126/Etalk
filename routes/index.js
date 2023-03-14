const express= require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');

console.log('router loaded');

router.get('/',homeController.home);
//router.get('/',usersController.profile);
router.use('/users',require('./users'));
module.exports = router;
