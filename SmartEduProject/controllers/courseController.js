// olusturulan model ice aktarildi
const Course = require('../modals/Course');

// model uzerinden yeni veri olusturulup veri tabanina eklendi
exports.createCourse = async (req, res) => {
  // eklenecek veri olarak istekten gelen body alindi
  const course = await Course.create(req.body);

  // durumun calisip calismadigi icin durum kontrolu yapildi
  try {
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
