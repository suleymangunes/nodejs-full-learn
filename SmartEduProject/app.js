// epxress kutuphanesi ice aktarildi
const express = require('express');

// express kutuphanesinden nesne olusturuldu
const app = express();

// Template Engine olarak ejs nin oldugu belirtildi
app.set('view engine', 'ejs');

// MIDDLEWARE
// static dosyalarin public icerisinde oldugu belirtildi
app.use(express.static('public'));

// get ile route olusturuldu
app.get('/', (req, res) => {
  // res.status(200).send('index sayfasi');
  res.render('index', {
    page_name: 'index',
  });
});

// about sayfasina gidildi
app.get('/about', (req, res) => {
  res.render('about', {
    page_name: 'about',
  });
});

// port ayarlandi
const port = 3000;
// listen ile server istenilen portta baslatildi
// her defasinda acip kapamamak icin nodemon kutuphanesi indirildi
// start kisminda nodemon app.js olarak ayarlandi
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
