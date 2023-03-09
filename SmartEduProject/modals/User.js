// kullanici icin model olusturuldu
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // kullanici rolu eklendi enum icerisinden secilir varsayilan olarak student secilidir
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  // kullanicinin kayitli oldugu kurslar icin liste olusturuldu
  courses: [
    {
      // eleman olarak obje ve referans olarak kursu aldi
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

// // dokumani olusturmadan once modele ekleme yapmak icin pre mtotu kullanildi
// UserSchema.pre('save', function (next) {
//   // hangi kullanici giris yapiyorsa onun cagrilmasi ciin this kullanilid
//   const user = this;
//   // sifre olusturuldu
//   bcrypt.hash(user.password, 10, (error, hash) => {
//     // kullanicinin sifresi hash olarak tanimlandi
//     user.password = hash;
//     // bir sonraki middelaware e gitmesi icin next kullanildi
//     next();
//   });
// });

// mongoose her kullanici islem yapinca sifreyi de yeniden duzenler
// bu yuzden bunu engellemek amaciyla her defasinda degistirmemesi saglandi
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
