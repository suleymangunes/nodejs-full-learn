// paket siralamasi yapilirken once 3. parti kutuphaneler daha sonra core kutuphaneler yazilir
// epxress kutuphanesi ice aktarildi
const express = require('express');
// veri tabani icin model olusturmak icin mongoose kutuphanesi ice aktarildi
const mongoose = require('mongoose');
// route fonksiyonu ice aktarildi
const pageRoute = require('./routes/pageRoute');
// course route
const courseRoute = require('./routes/courseRoutes');
// category route
const categoryRoute = require('./routes/categoryRoute');

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

// MIDDLEWARE
// static dosyalarin public icerisinde oldugu belirtildi
app.use(express.static('public'));

// json ile ilgili islemlerde middleware eklemeyi unutma
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ROUTES
// / istegine karsilik pageroute fonksiyonuna gidilmesi saglandi
// bu fonksiyon da express uzerinden olusturulan pageroute pagecontrollerdaki fonksiyonlari calistirir
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

// about sayfasina gidildi
app.use('/about', pageRoute);

// app.use('/courses', pageRoute);

// port ayarlandi
const port = 3000;
// listen ile server istenilen portta baslatildi
// her defasinda acip kapamamak icin nodemon kutuphanesi indirildi
// start kisminda nodemon app.js olarak ayarlandi
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
