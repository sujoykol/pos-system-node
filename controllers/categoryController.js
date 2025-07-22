const categoryModel = require('../models/categoryModel');

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  const offset = (page - 1) * perPage;

  const total = await categoryModel.count();
  const categories = await categoryModel.paginated(perPage, offset);

  res.render('category/index', {
    pageTitle: 'Category List',
    categories,
    currentPage: page,
    totalPages: Math.ceil(total / perPage)
  });
};

exports.getAdd = (req, res) => {
  res.render('category/add', {
    pageTitle: 'Add Category'
  });
};

exports.postAdd = async (req, res) => {
  const { name } = req.body;
  if(!name){
     req.flash('error', 'Category name  required');
     res.redirect('/categories/add');
  }else{
  await categoryModel.create(name);
  req.flash('success', 'Category added');
  res.redirect('/categories');
  }
};

exports.getEdit = async (req, res) => {
  const category = await categoryModel.find(req.params.id);
  res.render('category/edit', {
    pageTitle: 'Edit Category',
    category
  });
};

exports.postEdit = async (req, res) => {
  const { name } = req.body;
  await categoryModel.update(req.params.id, name);
  req.flash('success', 'Category updated');
  res.redirect('/categories');
};

exports.delete = async (req, res) => {
  await categoryModel.delete(req.params.id);
  req.flash('success', 'Category deleted');
  res.redirect('/categories');
};
