// fotograflar uzerinde yapilan islemler icin controller olusturuldu
// artik bu islemler controller uzerinden fonksiyon ile saglanacaktir

// fonksiyonlarda photo modeli kullanilacagi icin model ice aktarildi
const Photo = require('../models/Photo');
// dosya islemleri icin fs modulu ice aktarildi
const fs = require('fs');

// exports ile fonksiyonun disardan kullanilabilmesi saglandi
// tum fotograflari alan fonksiyon tanimlandii
exports.getAllPhotos = async (req, res) => {
  // page ile istenilen sayfa belirlenir eger herhangi bir sey belirtilmemisse 1 olmasi saglanir
  const page = req.query.page || 1;
  // her sayfada olmasi istenen post sayisi belirlendi
  const photosPerPage = 2;

  // total photos ile toplamda veritabaninda olan fotograf sayisi belirlendi
  const totalPhotos = await Photo.find().countDocuments();

  // veritanbanindan fotograflar cekildi
  const photos = await Photo.find({})
    // cekilen veriler zamana gore siralandi
    .sort('-dateCreated')
    // girilen sayfa sayisindan 1 eksilterek 2 ile carpilir ve gelen verilerden sonuc kadar ileri atlanir
    // ornerin 1 ise 0*2 den o olur ve atlama olmaz
    // 2 ise 1*2 den ilk ikisi atlanir bu sayede her sayfa icin verileri siralani
    .skip((page - 1) * photosPerPage)
    // her sayfada belirli sayida veri olacagi icin limit ile istenen kadarin gosterilmesi saglandi
    .limit(photosPerPage);

  // index sayfasina gidildi
  res.render('index', {
    // veri olarak fotograf verileri gonderildi
    photos,
    // current ile sayfa sirasi gonderildi
    current: page,
    // pages ile de toplam veri sayisina gore sayfalandirma numaralari gosterildi
    pages: Math.ceil(totalPhotos / photosPerPage),
  });

  // // photo veritabanindan veriler alindi ve zaman gore siralandi
  // const photos = await Photo.find({}).sort('-dateCreated');

  // // render ile / linkine gidilince views klasoru altindaki indexin calistirilmasi saglandi
  // // index icerisine photos modeli de gonderildi bu sayede verilerin gosterilmesi saglanacaktir
  // res.render('index', {
  //   photos,
  // });

  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  // send ile next kullanilmadan da middlewarein bitmesi saglandi

  // const photo = {
  //   id: 1,
  //   name: 'photo name',
  //   description: 'photo description',
  // };
  // res.send(photo);
};

// tek bir fotograf almak icin fonksiyon olusturuldu
exports.getPhoto = async (req, res) => {
  // console.log(req.params.id);
  // alinan id bilgisi ile veritabanindaki documente ulasildi
  const photo = await Photo.findById(req.params.id);
  // isetnilen sayfaya gonderildi ve sayfada gosterilmesi saglandi
  res.render('photo', {
    photo,
  });
};

// fotograf eklemek icin fonksiyon olusturuldu
exports.createPhoto = async (req, res) => {
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
  let uploadPath = './public/uploads/' + uploadedImage.name;

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
};

// fotograf bilgileri guncellemek icin fonksiyon olusturuldu
exports.updatePhoto = async (req, res) => {
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
};

// fotograf silmek icin fonksiyon olusturuldu
exports.deletePhoto = async (req, res) => {
  // console.log(req.params.id);
  // await Photo.findByIdAndRemove(req.params.id);
  const photo = await Photo.findOne({ _id: req.params.id });
  // silinecek resmin yolu ve resim tanimlandi
  let deletedImage = './public' + photo.image;

  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
