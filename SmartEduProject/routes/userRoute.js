const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddlewares');
const router = express.Router();

router.route('/signup').post(authController.createUser);
router.route('/signin').post(authController.LoginUser);
router.route('/logout').get(authController.logoutUser);
// dashboarda bir istek gelince once authmiddleware kontrol edilir sorun yoksa devam edilir
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);

module.exports = router;
