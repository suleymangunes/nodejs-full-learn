// nodemon paketi ile kodda degisiklik olunca sunucu tekrar baslatilir
// express pkaeti ice aktarildi
const express = require('express');

// path ile ilgili islemler icin path modulu ice aktarildi
const path = require('path');

// nodejste fonksiyonlar da first-class yapiya sahiptir bu yuzden bir fonksiyon degiskene atanabilir
const app = express();

// mylogger adinda bir middleware olusturuldu
// request response loop icerisinde tum fonksiyonlar middlewaredir
// birbiri ile iletisim halindeki uygulamalar arasinda yer alan tekrar eden gorevleri yapan tum ara yazilimlar widdlewaredir
const myLogger = (req, res, next) => {
  console.log('middleware logger 1');
  // middlewarein isini bitirerek bir sonraki middleware e gecmesi icin next kullanilid
  next();
};

// static dosyalarin bulundugu klasor expree ile belirlenerek use ile kullanildi
app.use(express.static('public'));
// middleware kullanildi
app.use(myLogger);

// get olusturuldu / sayfasinda photo jsonu donmesi saglandi
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  // send ile next kullanilmadan da middlewarein bitmesi saglandi

  // const photo = {
  //   id: 1,
  //   name: 'photo name',
  //   description: 'photo description',
  // };
  // res.send(photo);
});

// port olusturuldu
const port = 3000;

// sunucu istenilen portta baslatildi
app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatildi`);
});
