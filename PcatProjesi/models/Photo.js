// model dosyasi icerisinde modeller olusturulur
// mongoose paketi ice aktarildi
const mongoose = require('mongoose');
// mongoose ile schema nesnesi olusturuldu
const Schema = mongoose.Schema;

// schema nesnesi ile veritabaninda kullanilan resim icin resim sablonu olusturuldu
const PhotoSchema = new Schema({
  // icerik baslik, aciklama, resim ve eklenme tarihi tanimlandi
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// olusturulan sema uzerinden model olusturuldu
const Photo = mongoose.model('Photos', PhotoSchema);

// olusturulan modul disa aktarildi
module.exports = Photo;
