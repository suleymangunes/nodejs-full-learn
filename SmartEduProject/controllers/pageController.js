// mail atmak icin paket ice atkarildi
const nodemailer = require('nodemailer');
const Course = require('../modals/Course');
const User = require('../modals/User');

// controller klasoru icerisinde sayfalar arasi gecis fonksiyonlari tanimlandi
exports.getAboutPage = (req, res) => {
  res.render('about', {
    page_name: 'about',
  });
};

// contact pagee gidilmesi saglandi
exports.getContactPage = (req, res) => {
  res.render('contact', {
    page_name: 'contact',
  });
};

exports.getIndexPage = async (req, res) => {
  // res.status(200).send('index sayfasi');
  // console.log(req.session.userID);
  console.log(userIn);

  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudent = await User.find({ role: 'student' }).countDocuments();
  const totalTeacher = await User.find({ role: 'teacher' }).countDocuments();

  res.render('index', {
    page_name: 'index',
    courses,
    totalStudent,
    totalCourses,
    totalTeacher,
  });
};

// register sayfasina gidilir
exports.getRegisterPage = (req, res) => {
  res.render('register', {
    page_name: 'register',
  });
};

// login page
exports.getLoginPage = (req, res) => {
  res.render('Login', {
    page_name: 'Login',
  });
};

// exports.getCoursesPage = (req, res) => {
//   // res.status(200).send('index sayfasi');
//   res.render('courses', {
//     page_name: 'courses',
//   });
// };

// email gondermek icin fonksiyon
exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'kullanilacak hesap gonderilecek hesap ayrica', // gmail account
        pass: 'hesap sifresi', // gmail pass
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart edu project 👻" <maillerin gonderilecegi hesap>', // sender address
      to: 'maillerin gidecegi hesap', // list of receivers
      subject: 'new message ✔', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // flash ile flash mesaji olusturuldu
    req.flash('succes', 'we received your message succesfully');

    res.status(200).redirect('contact');
  } catch (error) {
    req.flash('error', 'we didnt received your message succesfully');
    res.status(200).redirect('contact');
  }
};
