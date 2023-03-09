// paket siralamasi yapilirken once 3. parti kutuphaneler daha sonra core kutuphaneler yazilir
// epxress kutuphanesi ice aktarildi
const express = require('express');
// veri tabani icin model olusturmak icin mongoose kutuphanesi ice aktarildi
const mongoose = require('mongoose');
// session icin express session paketi
const session = require('express-session');
// connect mongo ile session aktivitesi tanimlanir
const MongoStore = require('connect-mongo');
// flash mesajlar icin paket projeye dahil edildi
const flash = require('connect-flash');
// put kullanmak icin methodoverride eklendi
const methodOverride = require('method-override');
// route fonksiyonu ice aktarildi
const pageRoute = require('./routes/pageRoute');
// course route
const courseRoute = require('./routes/courseRoutes');
// category route
const categoryRoute = require('./routes/categoryRoute');
// user route
const userRoute = require('./routes/userRoute');

// express kutuphanesinden nesne olusturuldu
const app = express();

// mongoose ile veri tabanibaglantisi
// mongoose
//   .connect('mongodb://localhost/smartedu-db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log('db connected succesfully');
//   });
mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb://localhost/smartedu-db')
  .then(() => console.log('Connected!'));

// Template Engine olarak ejs nin oldugu belirtildi
app.set('view engine', 'ejs');

// global degisken olusturuldu
// kullanici giri yapmis ise gerekli goruntunun yapilmasi saglandi
global.userIn = null;

// MIDDLEWARE
// static dosyalarin public icerisinde oldugu belirtildi
app.use(express.static('public'));

// json ile ilgili islemlerde middleware eklemeyi unutma
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// session middleware
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    // mongostore connect ile session durumu tanimlandi
    // bu sayede giris yapilinca server durdurulsa bile cikis yapilmayacaktir
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/smartedu-db',
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  // flash mesajlari local degiskene atandi
  res.locals.flashMessages = req.flash();
  next();
});

// put gibi seyleri kullanmak icin methodoverride middelware eklendi
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
// / istegine karsilik pageroute fonksiyonuna gidilmesi saglandi
// bu fonksiyon da express uzerinden olusturulan pageroute pagecontrollerdaki fonksiyonlari calistirir
// her sayfaya geciste userin tanimlamasi saglandi
// bu sayede kullanici var ise belirli tasarim yok ise belirli tasarim saglanacaktir
app.use('*', (req, res, next) => {
  userIn = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
// about sayfasina gidildi
app.use('/about', pageRoute);
// app.use('/contact', pageRoute);

// app.use('/courses', pageRoute);

// port ayarlandi
const port = 3000;
// listen ile server istenilen portta baslatildi
// her defasinda acip kapamamak icin nodemon kutuphanesi indirildi
// start kisminda nodemon app.js olarak ayarlandi
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
