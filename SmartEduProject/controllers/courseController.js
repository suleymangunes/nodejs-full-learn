// olusturulan model ice aktarildi
const Course = require('../modals/Course');

// model uzerinden yeni veri olusturulup veri tabanina eklendi
exports.createCourse = async (req, res) => {
  // durumun calisip calismadigi icin durum kontrolu yapildi
  try {
    // eklenecek veri olarak istekten gelen body alindi
    const course = await Course.create(req.body);
    // eger basarili ise json dosyasinda icerik ve basarili durum gonderildi
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    // eger hata varsa error gonderildi
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    // res.status(200).json({
    //   status: 'success',
    //   courses,
    // });
    res.status(200).render('courses', {
      courses,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
