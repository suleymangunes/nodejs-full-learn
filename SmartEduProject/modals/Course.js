// model olusturmak icin mongoose kutuphanesi ice aktarildi
const mongoose = require('mongoose');

// schema nesnesi olusturuldu
const Schema = mongoose.Schema;

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
});

// olusturulan sablonun modele cevrilmesi saglandi
const Course = mongoose.model('Course', CourseSchema);

// modeli disa aktarilmasi saglandi
module.exports = Course;
