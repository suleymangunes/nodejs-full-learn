// nodemon paketi ile kodda degisiklik olunca sunucu tekrar baslatilir
// express pkaeti ice aktarildi
const express = require('express');

// path ile ilgili islemler icin path modulu ice aktarildi
const path = require('path');

// ejs saf javascript kodlarinin kullanilmasina ayni zamanda calismaya ait degisken icerikleri de kullanmaya imkan verir
// ejs template dosyalari gorebilmek icin varsayilan olarak views klasoru altina bakar
// static ile dinamik dosyalarin beraber calismai icin template engine kullanilir esj bir template enginedir
const ejs = require('ejs');

// mongoose ile veritabaninda kullanilmak uzere resim modeli olusturuldu
const Photo = require('./models/Photo');
const { default: mongoose } = require('mongoose');

// nodejste fonksiyonlar da first-class yapiya sahiptir bu yuzden bir fonksiyon degiskene atanabilir
const app = express();

// middleware ile olusan connnect uyarisi duzeltildi
mongoose.set('strictQuery', false);

// veri tabaniyla baglanti kuruldu
mongoose.connect('mongodb://localhost/pcat-test-db');

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

// ROUTES
// get olusturuldu / sayfasinda photo jsonu donmesi saglandi
app.get('/', async (req, res) => {
  const photos = await Photo.find({});

  // render ile / linkine gidilince views klasoru altindaki indexin calistirilmasi saglandi
  res.render('index', {
    photos,
  });

  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  // send ile next kullanilmadan da middlewarein bitmesi saglandi

  // const photo = {
  //   id: 1,
  //   name: 'photo name',
  //   description: 'photo description',
  // };
  // res.send(photo);
});

// about linkine gidilince render ile viewsin altindak abouy.ejs dosyasinin calistirilmasi saglandi
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

// bir veri alirken get gonderirken post kullaniriz
// photos linkine yonlendirince
app.post('/photos', async (req, res) => {
  // gonderilen istegin iceriginin okunmasi saglandi ancak dogru okunmadi
  // bunun nedeni encode isleminin olmamasi
  // middleware yazilarak express ile cozduldu
  // console.log(req.body);
  // gonderdikten sonra tekrar anasayfaya donmesi saglandi
  await Photo.create(req.body);
  res.redirect('/');
});

// port olusturuldu
const port = 3000;

// sunucu istenilen portta baslatildi
app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatildi`);
});
