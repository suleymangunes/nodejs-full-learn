// nodemon paketi ile kodda degisiklik olunca sunucu tekrar baslatilir
// express pkaeti ice aktarildi
const express = require('express');

// nodejste fonksiyonlar da first-class yapiya sahiptir bu yuzden bir fonksiyon degiskene atanabilir
const app = express();

// get olusturuldu / sayfasinda photo jsonu donmesi saglandi
app.get('/', (req, res) => {
  const photo = {
    id: 1,
    name: 'photo name',
    description: 'photo description',
  };
  res.send(photo);
});

// port olusturuldu
const port = 3000;

// sunucu istenilen portta baslatildi
app.listen(port, () => {
  console.log(`sunucu ${port} portunda baslatildi`);
});
