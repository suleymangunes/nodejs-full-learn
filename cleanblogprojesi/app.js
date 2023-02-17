// express modulu ice  aktarildi
const express = require('express');

// ejs
const ejs = require('ejs');

// express modulu degiskene atandi
const app = express();

// mongoose paketi ice aktarildi
const mongoose = require('mongoose');

// method override
const methodOverride = require('method-override');

const Post = require('./models/Post');

const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');

mongoose.set('strictQuery', false);

mongoose
  .connect(
    'mongodb+srv://suleymangunesmail:Jv5HYqMZbG9558F9@clusterclean.fmtk31k.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('database connectes');
  })
  .catch((err) => {
    console.log(err);
  });

// ejs template engine olarak ayarlandi
app.set('view engine', 'ejs');

// middleware ile staticler public klasorunde bildirimi
app.use(express.static('public'));

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// get ile istekte bulunuldu
app.get('/', postController.getAllPost);

app.get('/about', pageController.getAboutPage);

app.get('/add_post', pageController.getAddPage);

app.post('/add', postController.addPost);

// gelen id bilgisni alarak veritabanindan bulan route
app.get('/myposts/:id', pageController.getPostPage);

app.delete('/post/:id', postController.deletePost);

app.post('/post/edit/:id', pageController.getEditPage);

app.put('/post/update/:id', postController.editPost);

const port = 3000;

// tanimlanan porta baglanarak sunucu baslatildi
app.listen(port, () => {
  console.log('server started');
});
