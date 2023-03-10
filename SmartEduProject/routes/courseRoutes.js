// course routing icin express ve controller ice aktarildi
const express = require('express');
const courseController = require('../controllers/courseController');

const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// router uzerinden kurs olusturuldu
// eger middlewaree gore teacher ve admin ise kurs olusturulabilir
router
  .route('/')
  .post(roleMiddleware(['teacher', 'admin']), courseController.createCourse);

// bu kismi degistirecem
// router.route('/').post(courseController.createCourse);

router.route('/').get(courseController.getAllCourses);
// yakalanan slug ile kurs sayfasi gosterildi
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
// ogrencinin kurs almasi
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);

module.exports = router;
