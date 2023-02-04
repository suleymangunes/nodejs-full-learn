// express modulu ice  aktarildi
const express = require('express');

// express modulu degiskene atandi
const app = express();

// get ile istekte bulunuldu
app.get('/', (req, res) => {
  const blog = {
    id: 1,
    title: 'Blog title',
    description: 'Blog description',
  };

  res.send(blog);
});

const port = 3000;

// tanimlanan porta baglanarak sunucu baslatildi
app.listen(port, () => {
  console.log('server started');
});
