const User = require('../modals/User');

module.exports = async (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (user) {
      return res.redirect('/');
    }
    next();
  });
};
