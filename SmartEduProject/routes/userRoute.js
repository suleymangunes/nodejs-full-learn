const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddlewares');
const router = express.Router();
// body uzerinden validasyon islemi yapildi
const { body } = require('express-validator');
const User = require('../modals/User');

router.route('/signup').post(
  // body icerisinde name ozelligi bos ise girilmesi icin uyari saglandi
  [
    body('name').not().isEmpty().withMessage('please enter your name'),
    body('email')
      .isEmail()
      .withMessage('please enter your email')
      // ozel validaiton islemi olusturuldu
      .custom((userEmail) => {
        // kullaniciyi bularak email adresi alinmis bir kayit olup olmadigi kontrol edildi
        return User.findOne({
          email: userEmail,
        }).then((user) => {
          // eger kullanici var ise reddedilmesi saglandi
          if (user) {
            return Promise.reject('email is alreadt exist');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('please enter your password'),
  ],

  authController.createUser
);
router.route('/signin').post(authController.LoginUser);
router.route('/logout').get(authController.logoutUser);
// dashboarda bir istek gelince once authmiddleware kontrol edilir sorun yoksa devam edilir
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);

module.exports = router;
