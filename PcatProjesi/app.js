// nodemon paketi ile kodda degisiklik olunca sunucu tekrar baslatilir
// express pkaeti ice aktarildi
const express = require('express');

// path ile ilgili islemler icin path modulu ice aktarildi
const path = require('path');

// ejs saf javascript kodlarinin kullanilmasina ayni zamanda calismaya ait degisken icerikleri de kullanmaya imkan verir
// ejs template dosyalari gorebilmek icin varsayilan olarak views klasoru altina bakar
// static ile dinamik dosyalarin beraber calismai icin template engine kullanilir esj bir template enginedir
const ejs = require('ejs');

// resim yuklemek icin express file upload kutuphanesi ice aktarildi
const fileUpload = require('express-fileupload');

// dosya islemleri icin fs modulu ice aktarildi
const fs = require('fs');

// put islemi yapmak icin kutuphane ice aktarildi
const methodOverride = require('method-override');

// mongoose ile veritabaninda kullanilmak uzere resim modeli olusturuldu
const Photo = require('./models/Photo');
const { default: mongoose } = require('mongoose');

// fotograf ile ilgili islemler icin controller olusturuldu ve onun uzerinden islemler cagrildi
const photoController = require('./controllers/photoControllers');

// sayfalar arasindaki route islemi icin controller olusturuldu
const pageController = require('./controllers/pageController');

// nodejste fonksiyonlar da first-class yapiya sahiptir bu yuzden bir fonksiyon degiskene atanabilir
const app = express();

// middleware ile olusan connnect uyarisi duzeltildi
mongoose.set('strictQuery', false);

// veri tabaniyla baglanti kuruldu
mongoose
  .connect(
    'mongodb+srv://suleymangunespcat:YR6DsLUICCVPklMU@cluster0.gypayz1.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
  });

//template engine ejs olarak ayarlandi
app.set('view engine', 'ejs');

// mylogger adinda bir middleware olusturuldu
// request response loop icerisinde tum fonksiyonlar middlewaredir
// birbiri ile iletisim halindeki uygulamalar arasinda yer alan tekrar eden gorevleri yapan tum ara yazilimlar widdlewaredir
const myLogger = (req, res, next) => {
  console.log('middleware logger 1');
  // middlewarein isini bitirerek bir sonraki middleware e gecmesi icin next kullanilid
  next();
};

// MIDDLEWARES
// static dosyalarin bulundugu klasor expree ile belirlenerek use ile kullanildi
app.use(express.static('public'));
// middleware kullanildi
app.use(myLogger);

// gelen verilerin encode edilmesi saglandi
app.use(express.urlencoded({ extends: true }));
// gelen verilerin json seklinde encodu tanimlandi
app.use(express.json());

// resim yuklemek icin middleware
app.use(fileUpload());

// method override kisminda hangi metotlarin kullaniacagi tanimlandi
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
// get olusturuldu / sayfasinda photo jsonu donmesi saglandi
app.get('/', photoController.getAllPhotos);

// about linkine gidilince render ile viewsin altindak abouy.ejs dosyasinin calistirilmasi saglandi
app.get('/about', pageController.getAboutPage);

app.get('/add', pageController.getAddPage);

// bir veri alirken get gonderirken post kullaniriz
// photos linkine yonlendirince
app.post('/photos', photoController.createPhoto);

// id degerine gore tiklanan fotografin id bilgisi alindi
app.get('/photos/:id', photoController.getPhoto);

// put islemini cogu taryici desteklemez bu yuzden post ile putu simule edilir
// bunun icin methodoverride paketi kurulur
// bu paket ile post yapan methodun icerisinde methodun put oldugu belirtilirs
// put ile guncelleme islemi yapilir
// photos sayfasinda id degeri ile ulasilir
app.put('/photos/:id', photoController.updatePhoto);

// silme islemi icin id uzerinden silme yapilacakti
// methodoverride kismnda methodlar eklenmezse calismayacakti
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/photos/edit/:id', pageController.getEditPage);

// port olusturuldu
const port = 3000;

// sunucu istenilen portta baslatildi
app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatildi`);
});
