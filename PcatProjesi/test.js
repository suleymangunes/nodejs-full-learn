// mongoose kutuphanei mongodb ile nodejs arasinda iletisimi kolaylastiran bir pakettir
// bir nesne modellemede odm kutuphanesi olarak mongoose schema yapisi sayeseinde turetilen nesneleri mongodb icerisindeki dokumanlara donsuturur
const mongoose = require('mongoose');

// mongoose ile schema ( sablon ) olusuturulmasi icin nesne olurusturuldu
const Schema = mongoose.Schema;

mongoose.set('strictQuery', false);

// connect database
// veri tabani oluturur eger var ise olani secer
// mongodb olacagi belirtilir
// localde calisilacagi icin localhost olacagi belirtilir
// olusturulmak istenen veri tabani ismi yazilir
mongoose.connect('mongodb://localhost/pcat-test-db');

// create schema
// veritabaninda fotografa ihtiyac oldugu icin fotograf icin gerekli ozellikleri tutan sablon olusturuldu
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

// mongoose Photo yu kucuk harflere cevirip cogul yaparak collection olusturur ve sablon olarna olusturulan scheamayi kullanir
const Photo = mongoose.model('Photo', PhotoSchema);

// CRUD

// CREATE a photo
// crud islemlerini ilki olan create icin olusturulan model uzerinden create metotu ile olsuturma islemi yapilir
// model olusturulurken schema kullanildigi icin bizden bu degerler istenir
Photo.create({
  title: 'photo title 1',
  description: 'photo description',
});

// READ a photo
// veritabanindan veri okumak icin read kullanilir
// ilk parametre filtreleme vs
// ikinci parametre olarak callback kullanilir bu kisimda error ve data alinir
Photo.find({}, (err, data) => {
  if (err) throw err;
  console.log(data);
});

// UPDATE a phot
// id degerine gore guncellemek icin istenilen dokumanin id degeri tanimlanir
const id = '63dfbf30f3f5ed1296a6c32c';
// id degerine gore guncelleme islmei yapilir
// param1 degistirilmek istenen id
// param2 degistirilmek istenen icerik
// param3 yeni eklenince konsolda gosterilmesi
// param4 callback fonksiyonu
Photo.findByIdAndUpdate(
  id,
  {
    // tamaminin degil istenildigi kadar kisim degistirilebilir
    title: 'updated title 111111',
    // description: 'updated description',
  },
  {
    new: true,
  },
  (err, data) => {
    console.log(data);
  }
);

// DELETE a photo
// id degeriyle silmek icin documentin id degeri tanimlandi
const deletedID = '63dfbf30f3f5ed1296a6c32c';

// id degeri ile document silindi
// param1 silinmek istenen documentin id degeri
// param2 callback
// Photo.findOneAndDelete(id, (err, data) => {
//   console.log(data);
// });
