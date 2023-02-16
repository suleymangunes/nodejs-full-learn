const Post = require('../models/Post');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add_post');
};

exports.getPostPage = async (req, res) => {
  // console.log(req.params.id);
  // alinan id ile post cekildi
  console.log(req.params.id);
  const mypost = await Post.findById(req.params.id);
  // console.log(mypost);
  // cekilen post istenen html koduna icerik olarak gonderildi
  // bu kisimda post ejs icerigine ekleme yapilmalidir
  res.render('post', {
    mypost,
  });
};

exports.getEditPage = async (req, res) => {
  console.log(req.params.id);

  const mypost = await Post.findById(req.params.id);

  console.log(mypost);
  // res.redirect('/');

  res.render('edit', {
    mypost,
  });
};
