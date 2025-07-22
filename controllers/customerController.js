const customerModel = require('../models/customerModel');
const db = require('../db');

exports.list = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const offset = (page - 1) * perPage;
  
    const total = await customerModel.count();
    const customers = await customerModel.paginated(perPage, offset);
  res.render('customer/index', {
    pageTitle: 'Customer List',
    customers,
    currentPage: page,
    totalPages: Math.ceil(total / perPage)
  });
};

exports.getAdd = (req, res) => {
  res.render('customer/add', {
    pageTitle: 'Add Customer'
  });


};

exports.postAdd = async (req, res) => {
  const { name, email, phone, address } = req.body;
  if(!name){
    req.flash('error', 'Customer Name Required');
    res.redirect('/customers/add');
  }
  else if(!phone) {
    req.flash('error', 'Customer Phone Required');
    res.redirect('/customers/add');
  }else {
  await customerModel.create(name, email, phone, address);
  req.flash('success', 'Customer added');
  res.redirect('/customers');
  }
  
};

exports.getEdit = async (req, res) => {
  const customer = await customerModel.find(req.params.id);
  res.render('customer/edit', {
    pageTitle: 'Edit Customer',
    customer
  });
};

exports.postEdit = async (req, res) => {
  const { name, email, phone, address } = req.body;
  await customerModel.update(req.params.id, name, email, phone, address);
  req.flash('success', 'Customer updated');
  res.redirect('/customers');
};

exports.delete = async (req, res) => {
  await customerModel.delete(req.params.id);
  req.flash('success', 'Customer deleted');
  res.redirect('/customers');
};

//======== Ajax Add Customer 

exports.addCustomer = (req, res) => {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.json({ success: false, message: 'Name is required' });
  }

  const sql = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error('DB Insert Error:', err);
      return res.json({ success: false, message: 'Database error' });
    }

    const newCustomer = {
      id: result.insertId,
      name: name,
      email: email,
      phone: phone,
      display: `${name} - ${phone}`
    };

    return res.json({ success: true, customer: newCustomer });
  });
};

