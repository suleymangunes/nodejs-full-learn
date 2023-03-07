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
});

// dokumani olusturmadan once modele ekleme yapmak icin pre mtotu kullanildi
UserSchema.pre('save', function (next) {
  // hangi kullanici giris yapiyorsa onun cagrilmasi ciin this kullanilid
  const user = this;
  // sifre olusturuldu
  bcrypt.hash(user.password, 10, (error, hash) => {
    // kullanicinin sifresi hash olarak tanimlandi
    user.password = hash;
    // bir sonraki middelaware e gitmesi icin next kullanildi
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
