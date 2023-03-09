// olusturulan model ice aktarildi
const Category = require('../modals/Category');
const Course = require('../modals/Course');
const User = require('../modals/User');

// model uzerinden yeni veri olusturulup veri tabanina eklendi
exports.createCourse = async (req, res) => {
  // durumun calisip calismadigi icin durum kontrolu yapildi
  try {
    // eklenecek veri olarak istekten gelen body alindi
    // kurs olusturulurken name description category ve user bilgisi ile olusturuldu
    // bunun nedeni kursu kimin olusturdugunu bilmektir
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    // eger basarili ise json dosyasinda icerik ve basarili durum gonderildi
    // res.status(201).json({
    //   status: 'success',
    //   course,
    // });
    req.flash('succes', 'your course has been created');
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash('error', 'your course hasnt been created');
    res.status(404).redirect('/courses');
    // // eger hata varsa error gonderildi
    // res.status(400).json({
    //   status: 'fail',
    //   error,
    // });
  }
};

// tum kurslari veri tabanindan cekip gererkli sayfaya yonlendirilmesi icin fonksiyon
exports.getAllCourses = async (req, res) => {
  try {
    // queryden categories karsiligi alindi
    const categorySlug = req.query.categories;

    // arama icin query
    const query = req.query.search;

    // category veritabanindan slug degeri queryden alinan category degeri olan veri ile filtrelendi
    const category = await Category.findOne({ slug: categorySlug });

    // verileri cekerken katergoriye gore filtreleme yapilasmi icin filtre olusturuldu
    let filter = {};

    // eger category secilmisse filtre dolduruldu secilmemisse bos kalmasi saglandi
    if (categorySlug) {
      filter = { category: category._id };
    }

    // eger query var ise search alani dolu ise filtreye yenisi eklendi
    if (query) {
      filter = { name: query };
    }

    // eger query ve ceategoru slug yok ise iki degerin de bos olmasi saglandi
    if (!query && !categorySlug) {
      (filter.name = ''), (filter.category = null);
    }

    // kurslar filtreleme islemi ile alidni
    const courses = await Course.find({
      // regular expression ile arama saglandi
      // regex ile icerisinde isim degiskeninden olan deger var ise basinda veya sonunda nerede bulunursa secilmesi saglandi
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      .populate('user');
    // kategoriler alindi
    const categories = await Category.find();
    // kurs sayfasina yonlendirildi
    res.status(200).render('courses', {
      courses,
      categories,
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
    const categories = await Category.find();
    const user = await User.findById(req.session.userID);

    // kurs sayfasi slug ile bulundu slugify paketi ile database e kaydedilen veri de slug otomaik olusturuldu
    const course = await Course.findOne({
      slug: req.params.slug,
      // populate ile coursun user veri tabani kismina da ulasildi
    }).populate('user');

    // tekil kurs sayfasinda kursu olusturan ogretmen bilgisi de eklenmek istenirse bu sekilde
    // course user id uzerinden yapilabilirdi ancak bunun yerine populate ile yapildi
    // const user = await User.findOne({
    //   _id: course.user,
    // });

    res.status(200).render('course', {
      course,
      user,
      categories,
      // user,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// ogrencinin kurs almasi icin fonksiyon
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug,
      // populate ile coursun user veri tabani kismina da ulasildi
    }).populate('user');
    // ogrenci id belirlenir ve id ye gore ders veritabanina eklenir
    const user = await User.findById(req.session.userID);

    await user.courses.addToSet({
      _id: req.body.course_id,
    });
    await user.save();

    // res.status(201).render('course', {
    //   course,
    //   page_name: 'courses',
    // });
    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// kurs kaydini silmek icin olusturulan fonksiyon
exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);

    // pull ile veritabanindan silinmesi saglandi
    await user.courses.pull({
      _id: req.body.course_id,
    });
    await user.save();

    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
