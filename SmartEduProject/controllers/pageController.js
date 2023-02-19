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
