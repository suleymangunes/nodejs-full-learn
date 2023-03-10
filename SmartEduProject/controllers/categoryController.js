// category modeli ice aktarildi
const Category = require('../modals/Category');

// kategori olusturmak icin fonksiyon tanimlandi
exports.createCategory = async (req, res) => {
  try {
    // console.log('calisti');
    const category = await Category.create(req.body);

    // console.log(category);
    // await Category.create({ name: 'python' });
    // console.log('merhaba');
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

// kategori silmek icin fonksiyon olusturuldu
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);

    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
