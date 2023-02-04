// express modulu ice  aktarildi
const express = require('express');

// ejs
const ejs = require('ejs');

// express modulu degiskene atandi
const app = express();

// ejs template engine olarak ayarlandi
app.set('view engine', 'ejs');

// middleware ile staticler public klasorunde bildirimi
app.use(express.static('public'));

// get ile istekte bulunuldu
app.get('/', (req, res) => {
  res.render('index');
  // const blog = {
  //   id: 1,
  //   title: 'Blog title',
  //   description: 'Blog description',
  // };

  // res.send(blog);
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

const port = 3000;

// tanimlanan porta baglanarak sunucu baslatildi
app.listen(port, () => {
  console.log('server started');
});
