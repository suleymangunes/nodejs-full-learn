// course routing icin express ve controller ice aktarildi
const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

// router uzerinden kurs olusturuldu
router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
// yakalanan slug ile kurs sayfasi gosterildi
router.route('/:slug').get(courseController.getCourse);
module.exports = router;
