// sayfalar arasindaki gecis routeu icin controller olsuturuldu ve fonksiyonlar ile sayfalar arasi gecis saglandi
// photo modeli fonksiyonlarda kullanildigi icin ice aktarildi
const Photo = require('../models/Photo');

// exports ile fonksiyonlarin baska dosyalardan cagrilabilmesi saglandi
// about sayfasina gitmek icin fonskyion
exports.getAboutPage = (req, res) => {
  res.render('about');
};

// add sayfasina gitmek icin fonksiyon
exports.getAddPage = (req, res) => {
  res.render('add');
};

// edit sayfasina gitmek icin fonksiyon
exports.getEditPage = async (req, res) => {
  //   console.log(req.params.id);
  // res.redirect(`/photos/${req.params.id}`);
  // edit sayfasinda bir oge degisecegi icin oncelikle gelen id degeri ile oge bulundu ve model olusturuldu
  const photomine = await Photo.findById(req.params.id);
  // olusturulan model edit sayfasina gonderildi
  res.render('edit', {
    photomine,
  });
};
