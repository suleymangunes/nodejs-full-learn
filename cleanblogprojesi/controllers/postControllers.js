const Post = require('../models/Post');

exports.getAllPost = async (req, res) => {
  const posts = await Post.find({}).sort({ dateCreated: -1 });
  res.render('index', {
    posts,
  });
  // console.log(posts.length);
  // const blog = {
  //   id: 1,
  //   title: 'Blog title',
  //   description: 'Blog description',
  // };

  // res.send(blog);
};

exports.addPost = async (req, res) => {
  // console.log('gidildi');
  // console.log(req);
  // console.log(req.body);
  await Post.create(req.body);
  res.redirect('/');
};

exports.deletePost = async (req, res) => {
  // console.log('id degerimiz ' + req.params.id);
  // const photo = await Post.find({ _id: req.params.id });
  // console.log(photo);
  // console.log(photo[0]._id);
  await Post.findOneAndRemove({ _id: req.params.id });
  // await Post.findOneAndRemove(req.params.id);
  res.redirect('/');
};

exports.editPost = async (req, res) => {
  console.log(req.body);
  const mypost = await Post.findById(req.params.id);
  console.log(mypost);
  mypost.name = req.body.name;
  mypost.message = req.body.message;
  mypost.save();
  res.redirect('/');
};
