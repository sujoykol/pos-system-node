const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;

  const total = await productModel.count();
  const products = await productModel.paginated(perPage, offset);

  res.render('product/index', {
    pageTitle: 'Product List',
    products,
    currentPage: page,
    totalPages: Math.ceil(total / perPage)
  });
};

exports.getAdd = async (req, res) => {
  const categories = await categoryModel.all();
  res.render('product/add', {
    pageTitle: 'Add Product',
    categories
  });
};

exports.postAdd = async (req, res) => {
  const { name, price, category_id } = req.body;
  const image = req.file ? req.file.filename : null;
  console.log(image);

   if(!name){
       req.flash('error', 'Product Name Needed');
        res.redirect('/products/add');
   }
    if(!price){
       req.flash('error', 'Product Price  Needed');
        res.redirect('/products/add');
   }
   

  await productModel.create(name, price, category_id, image);
  req.flash('success', 'Product added');
  res.redirect('/products');
};

exports.getEdit = async (req, res) => {
  const product = await productModel.find(req.params.id);
  const categories = await categoryModel.all();
  res.render('product/edit', {
    pageTitle: 'Edit Product',
    product,
    categories
  });
};

exports.postEdit = async (req, res) => {
  const { name, price, category_id } = req.body;
  const image = req.file ? req.file.filename : null;
  // const image = req.image ? req.image.filename : null;
  //console.log('FILE:', req.file);

     if(image){
    await productModel.update(req.params.id, name, price, category_id, image);
     }
     else {
       await productModel.update(req.params.id, name, price, category_id);

     }
  
  req.flash('success', 'Product updated');
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await productModel.delete(req.params.id);
  req.flash('success', 'Product deleted');
  res.redirect('/products');
};
