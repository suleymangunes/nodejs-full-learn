// express modulu ice  aktarildi
const express = require('express');

// ejs
const ejs = require('ejs');

// express modulu degiskene atandi
const app = express();

// mongoose paketi ice aktarildi
const mongoose = require('mongoose');
const Post = require('./models/Post');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/cleanblog-test-db');

// ejs template engine olarak ayarlandi
app.set('view engine', 'ejs');

// middleware ile staticler public klasorunde bildirimi
app.use(express.static('public'));

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

// get ile istekte bulunuldu
app.get('/', async (req, res) => {
  const posts = await Post.find({}).sort({ dateCreated: -1 });
  res.render('index', {
    posts,
  });
  console.log(posts.length);
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

app.post('/add', async (req, res) => {
  console.log('gidildi');
  // console.log(req);
  console.log(req.body);
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

// tanimlanan porta baglanarak sunucu baslatildi
app.listen(port, () => {
  console.log('server started');
});
