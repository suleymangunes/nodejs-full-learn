const User = require('../modals/User');
const Category = require('../modals/Category');
const bcrypt = require('bcrypt');
const Course = require('../modals/Course');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // res.status(201).json({
    //   status: 'succes',
    //   user,
    // kaydolunca giris yapma sayfasina yonlendirildi
    res.status(201).redirect('/login');
  } catch (error) {
    // console.log(error);
    // res.status(400).json({
    //   status: 'fail',
    //   error,
    // });
    // validaitor ile sorun varsa yakalandi
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `error: ${errors.array()[i].msg}`);
    }
    res.status(404).redirect('/register');
  }
};

// login islemi yapildi
exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      // sifreleme
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // user sessions

          req.session.userID = user._id;

          res.status(200).redirect('/users/dashboard');
        } else {
          // eger sifre dogru degilse flash mesaj gosterilmesi saglandi
          req.flash('error', `your password is not correct`);
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', `user is not exist`);
      res.status(400).redirect('/login');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// cikis yapmak icin yapilan fonskiyon
exports.logoutUser = (req, res) => {
  // destroy ile session oturum kapatildi
  req.session.destroy(() => {
    res.redirect('/');
  });
};

// dashboard sayfasina gitmek icin fonksiyon
exports.getDashboardPage = async (req, res) => {
  // dashborad sayfasinda ogrencinin kayitli oldugu kurslar ogrenci tablosunda eleman olarak referansı kurs olan veri eklenmisti
  // bu sayede populate ile refereans uzerinden course tablosuna erisilerek islem yapilabilir
  const user = await User.findOne({
    _id: req.session.userID,
  }).populate('courses');
  // kategoriler alindi
  const categories = await Category.find();
  // aktif olan kullanicinin kurslari secildi ve bunların gosterilmesi saglandi
  const courses = await Course.find({
    user: req.session.userID,
  });
  const users = await User.find({});
  res.render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
    users,
  });
};

// kullanici silmek icin fonksiyon olusturuldu
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    // ogretmen kalkinca olusturdugu kurslarin da kaldirilmasi saglandi
    await Course.deleteMany({
      user: req.params.id,
    }).then((user) => {
      console.log(user);
    });

    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
