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
    res.status(201).json({
      status: 'succes',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
