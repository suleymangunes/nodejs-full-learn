const User = require('../modals/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'succes',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
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
        }
      });
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
  const user = await User.findOne({
    _id: req.session.userID,
  });
  res.render('dashboard', {
    page_name: 'dashboard',
    user,
  });
};
