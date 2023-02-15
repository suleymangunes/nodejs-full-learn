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

// resim yuklemek icin middleware
app.use(fileUpload());

app.use(methodOverride('_method'));

// ROUTES
// get olusturuldu / sayfasinda photo jsonu donmesi saglandi
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');

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

  // console.log(req.files.image);

  // await Photo.create(req.body);
  // res.redirect('/');

  // resimlerin yuklenecegi klasor yoksa
  const uploadDir = 'public/uploads';

  // eger klasor yoksa klasorun olusturulmasi saglandi
  // ancak senkron bir sekilde calistirildi
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // req.files.image ile resim bilgileri alindi
  let uploadedImage = req.files.image;
  // uploadpath ile bulunan klasorde resimlerin kaydedilecegi kisim tanimlandi
  // veritabaninda resimlerin yolu tanimlanir
  // dirname ile bulunan klasor tanimlandi ve pulicin altinda uploads adinda klasor olusturuldu ve resmin adi verildi
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  // upload image mv ile resmin tasinmasi icin fonksiyon tanimlandi
  uploadedImage.mv(
    // resim yuklenirken mv ile klasore yonlendirilmesi saglandi
    uploadPath,
    // islemelrin yapilacagi async fonksiyon tanimlandi
    async () => {
      // photo modeli ile resim olusturuldu ve icerige gore olusturuldu
      await Photo.create({
        // ... ile iceirkte ne varsa eslemesi saglandi
        ...req.body,
        // name description vs body ile geldi
        // image ise uploadsin altinda name ile eklendi
        // veritabaninda resmin yolu tutulur
        image: '/uploads/' + uploadedImage.name,
      });

      res.redirect('/');
    }
  );
});

// id degerine gore tiklanan fotografin id bilgisi alindi
app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id);
  // alinan id bilgisi ile veritabanindaki documente ulasildi
  const photo = await Photo.findById(req.params.id);
  // isetnilen sayfaya gonderildi ve sayfada gosterilmesi saglandi
  res.render('photo', {
    photo,
  });
});

// update butonuna tiklaninca edit sayfasina id degeri ile gonderilmesi saglandi
// bu islem zaman alacagi icin async olmasi ve zaman alan islemde await ile beklenmesi saglandi
app.get('/photos/edit/:id', async (req, res) => {
  // photo veritabanindan id degeri uyan veri cekildi
  const photomine = await Photo.findOne({
    _id: req.params.id,
  });
  // istenen sayfaya gelen veri ile gidilmesi saglandi
  res.render('edit', {
    photomine,
  });
});

// put ile guncelleme islemi yapilir
// photos sayfasinda id degeri ile ulasilir
app.put('/photos/:id', async (req, res) => {
  // photo veritabanindan findone ile istenilen id degerli fotograf bulundu
  const photomine = await Photo.findOne({
    _id: req.params.id,
  });
  // bulunan fotogratgin title ve description degeri istekle gelen degerlerle degistirildi
  photomine.title = req.body.title;
  photomine.description = req.body.description;
  // fotograf kaydedildi
  photomine.save();
  // redirect ile fogoragin safyasina gidildi
  res.redirect(`/photos/${req.params.id}`);
});

// port olusturuldu
const port = 3000;

// sunucu istenilen portta baslatildi
app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatildi`);
});
