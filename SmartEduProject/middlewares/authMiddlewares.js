const User = require('../modals/User');
// ozel middleware olusturuldu
module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    // eger kullanici yok ise veya hata olursa login sayfasina yonlendirilmesi saglandi
    if (err || !user) {
      return res.redirect('/login');
      next();
    } else {
      next();
    }
  });
};
