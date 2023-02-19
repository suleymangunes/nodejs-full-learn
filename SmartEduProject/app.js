// paket siralamasi yapilirken once 3. parti kutuphaneler daha sonra core kutuphaneler yazilir
// epxress kutuphanesi ice aktarildi
const express = require('express');
// route fonksiyonu ice aktarildi
const pageRoute = require('./routes/pageRoute');

// express kutuphanesinden nesne olusturuldu
const app = express();

// Template Engine olarak ejs nin oldugu belirtildi
app.set('view engine', 'ejs');

// MIDDLEWARE
// static dosyalarin public icerisinde oldugu belirtildi
app.use(express.static('public'));

// ROUTES
// / istegine karsilik pageroute fonksiyonuna gidilmesi saglandi
// bu fonksiyon da express uzerinden olusturulan pageroute pagecontrollerdaki fonksiyonlari calistirir
app.get('/', pageRoute);

// about sayfasina gidildi
app.get('/about', pageRoute);

// port ayarlandi
const port = 3000;
// listen ile server istenilen portta baslatildi
// her defasinda acip kapamamak icin nodemon kutuphanesi indirildi
// start kisminda nodemon app.js olarak ayarlandi
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
