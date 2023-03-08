// model olusturmak icin mongoose kutuphanesi ice aktarildi
const mongoose = require('mongoose');

// schema nesnesi olusturuldu
const Schema = mongoose.Schema;

// slugify ile url de id yerine slug ifadeleri olusturulur
const slugify = require('slugify');

// nesne uzerinden cours sablonu olusturuldu
const CourseSchema = new Schema({
  // isim aciklama ve tarih degerlerini aldi
  name: {
    // suslu parantez ile obje olmasi saglandi
    // icerik string benzersiz ve doldurulmasi gerekli ozellikleri eklendi
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // veri tabanina veri eklenince otomatik slug olusturuulmasi icin slug eklendi
  slug: {
    // slugin benzersiz olmasi saglandi
    type: String,
    unique: true,
  },
  // kategori secimi category modeli uzerinden olusturuldu
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  // olusturulan kurs icin kullanici bilgisinin tutulacagi alan olusturuldu
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// error function this desteklemez bu yuzden function kullanildi
// semaya pre ile eklenen slugin name degeri ile slug olusturmasi saglandi
// middleware bitince yeni middlewarein eklenmesi saglandi
CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

// olusturulan sablonun modele cevrilmesi saglandi
const Course = mongoose.model('Course', CourseSchema);

// modeli disa aktarilmasi saglandi
module.exports = Course;
