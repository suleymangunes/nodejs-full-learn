// route icin yeni klasor ve dosya olusturuldu
const express = require('express');
// route hazirlamak icin express kutuphanesinden yararlanildi
// olusturulan page controller fonksiyonlara projeye dahil edildi
const pageController = require('../controllers/pageController');

// epxress kutuphanesi uzerinden router olusturuldu
const router = express.Router();

// router ile eger / kullanilmis ise pagecontroller uzerinden index page e gitmesi saglandi
router.route('/').get(pageController.getIndexPage);
// eger about kullanilmissa pagecontroller uzerinden abouta gitmesi saglandi
router.route('/about').get(pageController.getAboutPage);
// courses sayfasi
// router.route('/courses').get(pageController.getCoursesPage);
router.route('/register').get(pageController.getRegisterPage);

// modullerin disa aktarilmasi saglandi
module.exports = router;
