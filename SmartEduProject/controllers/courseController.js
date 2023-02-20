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

// tum kurslari veri tabanindan cekip gererkli sayfaya yonlendirilmesi icin fonksiyon
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
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

// tek kurs alinarak kurs detay sayfasina gitmesi icin fonksiyon
exports.getCourse = async (req, res) => {
  try {
    // kurs sayfasi slug ile bulundu slugify paketi ile database e kaydedilen veri de slug otomaik olusturuldu
    const course = await Course.findOne({
      slug: req.params.slug,
    });
    res.status(200).render('course', {
      course,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
