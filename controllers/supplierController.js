const Supplier = require('../models/supplierModel');

exports.list = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    Supplier.getCount((err, countResult) => {
    if (err) throw err;
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Now get paginated data
    Supplier.getPaginated(limit, offset, (err, suppliers) => {
      if (err) throw err;
      res.render('suppliers/index', {
        suppliers,
        pageTitle: 'Suppliers List',
        currentPage: page,
        totalPages
      });
    });
  });
};

exports.showAdd = (req, res) => {
  res.render('suppliers/add',{  pageTitle: 'Add Supplier' });
};

exports.add = (req, res) => {
  const data = req.body; 
  Supplier.create(data, (err) => {
    if (err) throw err;
    res.redirect('/suppliers');
  });
};

exports.showEdit = (req, res) => {
  Supplier.getById(req.params.id, (err, rows) => {
    if (err) throw err;
    res.render('suppliers/edit', { supplier: rows[0], pageTitle: 'Edit Supplier' });
  });
};

exports.edit = (req, res) => {
  const data = req.body;
  Supplier.update(req.params.id, data, (err) => {
    if (err) throw err;
    res.redirect('/suppliers');
  });
};

exports.delete = (req, res) => {
  Supplier.delete(req.params.id, (err) => {
    if (err) throw err;
    res.redirect('/suppliers');
  });
};
