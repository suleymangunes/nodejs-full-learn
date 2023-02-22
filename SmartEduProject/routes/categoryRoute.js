// router olarak expressin router ozelliginden yararlanildi
const express = require('express');
// category controller nesnei olusturuldu
const categoryController = require('../controllers/categoryController');

// router nesnesi olusturuldu
const router = express.Router();

// router uzerinden / istegi ile kategori olusturulmasi saglandi
router.route('/').post(categoryController.createCategory);

// router disa aktarildi
module.exports = router;
