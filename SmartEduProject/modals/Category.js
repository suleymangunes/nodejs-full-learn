// mongoose ile veritabanindan veri icin model olusturuldu
const mongoose = require('mongoose');
// slugify ile slug ifadesi olusturuldu
const slugify = require('slugify');
// schema ile sablon nesnesi olusturuldu
const Schema = mongoose.Schema;

// categoru sablonu olusturuldu
const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

// olusturuldugunda slugin otomatik eklenmesi saglandi
CategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

// category modeli olusturuldu
const Category = mongoose.model('Category', CategorySchema);
// model disa aktarildi
module.exports = Category;
