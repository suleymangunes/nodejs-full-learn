const User = require('../modals/User');

// ozel middleware isim verilmeden anonim olarak olusturuldu
// request ile response arasindaki dongude her sey bir middlewaredir
// istenilen durumlardan middleware fonksiyonlari calistirilir
// ornegin giris yapmis bir kullanici giris yapma sayfasina ulasmak isterse dogurdan anasayfaya yonlendirilir
module.exports = async (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (user) {
      return res.redirect('/');
    }
    next();
  });
};
