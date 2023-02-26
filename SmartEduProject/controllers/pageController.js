// controller klasoru icerisinde sayfalar arasi gecis fonksiyonlari tanimlandi
exports.getAboutPage = (req, res) => {
  res.render('about', {
    page_name: 'about',
  });
};

exports.getIndexPage = (req, res) => {
  // res.status(200).send('index sayfasi');
  res.render('index', {
    page_name: 'index',
  });
};

// register sayfasina gidilir
exports.getRegisterPage = (req, res) => {
  res.render('register', {
    page_name: 'register',
  });
};

// exports.getCoursesPage = (req, res) => {
//   // res.status(200).send('index sayfasi');
//   res.render('courses', {
//     page_name: 'courses',
//   });
// };
