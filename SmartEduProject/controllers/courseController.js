// olusturulan model ice aktarildi
const Category = require('../modals/Category');
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
    // queryden categories karsiligi alindi
    const categorySlug = req.query.categories;
    console.log(categorySlug);
    // category veritabanindan slug degeri queryden alinan category degeri olan veri ile filtrelendi
    const category = await Category.findOne({ slug: categorySlug });

    // verileri cekerken katergoriye gore filtreleme yapilasmi icin filtre olusturuldu
    let filter = {};

    // eger category secilmisse filtre dolduruldu secilmemisse bos kalmasi saglandi
    if (categorySlug) {
      filter = { category: category._id };
    }

    // kurslar filtreleme islemi ile alidni
    const courses = await Course.find(filter);
    // kategoriler alindi
    const categories = await Category.find();
    // kurs sayfasina yonlendirildi
    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    console.log('hata');
    console.log(error);
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
