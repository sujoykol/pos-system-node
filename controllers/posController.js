const db = require('../db');
const posModel = require('../models/posModel');
const moment = require('moment');


exports.viewPOS = (req, res) => {
  db.query('SELECT * FROM products', (err, products) => {
    db.query('SELECT * FROM customers', (err2, customers) => {
      res.render('pos/index', {
        pageTitle: 'POS',
        products,
        customers,
        cart: req.session.cart || { items: {}, totalQty: 0, totalPrice: 0 }
      });
    });
  });
};

exports.addToCart = (req, res) => {
  const { id, name, price } = req.body;
  let cart = req.session.cart || { items: {}, totalQty: 0, totalPrice: 0 };
  if (!cart.items[id]) {
    cart.items[id] = { name, qty: 1, price };
  } else {
    cart.items[id].qty += 1;
  }
  cart.totalQty += 1;
  cart.totalPrice += price;
  req.session.cart = cart;
  res.json({ success: true, cart });
};

exports.removeFromCart = (req, res) => {
  const { id } = req.body;
  let cart = req.session.cart;
  if (cart && cart.items[id]) {
    cart.totalQty -= cart.items[id].qty;
    cart.totalPrice -= cart.items[id].qty * cart.items[id].price;
    delete cart.items[id];
    req.session.cart = cart;
  }
  res.json({ success: true, cart });
};

exports.updateCartQty = (req, res) => {
  const { id, action } = req.body;
  let cart = req.session.cart;
  if (!cart || !cart.items[id]) return res.json({ success: false });
  if (action === 'increase') {
    cart.items[id].qty++;
    cart.totalQty++;
    cart.totalPrice += cart.items[id].price;
  } else if (action === 'decrease') {
    cart.items[id].qty--;
    cart.totalQty--;
    cart.totalPrice -= cart.items[id].price;
    if (cart.items[id].qty <= 0) delete cart.items[id];
  }
  req.session.cart = cart;
  res.json({ success: true, cart });
};


exports.getCart = (req, res) => {
  res.json({
    cart: req.session.cart || { items: {}, totalQty: 0, totalPrice: 0 }
  });
};



exports.checkout = async (req, res) => {
  const cart = req.session.cart;
  const customerId = parseInt(req.body.customerId);
  if(!customerId){
      req.flash('error', 'Please select/add Customer');
      res.redirect('/pos');
  } else if (!cart || !cart.items || Object.keys(cart.items).length === 0) {
     req.flash('error', 'Cart is empty.');
      res.redirect('/pos');
  }
  else {
 
  let hasError = false;
  let errorMessages = [];    

for (const productId in cart.items) {
    const item = cart.items[productId];
    const product = await posModel.find(productId);
    const pstock = product.stock;
  if (pstock < item.qty) {
      hasError = true;
       errorMessages.push(`Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.qty}`);
    }
}

if (hasError) {
  errorMessages.forEach(msg => req.flash('error', msg));
  return res.redirect('/pos');
}
  const totalQty = cart.totalQty;
  const totalPrice = cart.totalPrice;
  const orderDate = moment().format('YYYY-MM-DD HH:mm:ss');
  const orderSql = 'INSERT INTO sales (customer_id, total_qty, total, date) VALUES (?, ?, ?, ?)';
  db.query(orderSql, [customerId, totalQty, totalPrice, orderDate], (err, result) => {
    if (err) {
      console.error('Order insert error:', err);
      return res.send('Error saving order');
    }
    const orderId = result.insertId;
    const orderItems = [];
    for (const pid in cart.items) {
      const item = cart.items[pid];
      orderItems.push([orderId, pid, item.qty, item.price]);
      db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.qty, pid]);
    }
    const itemSql = 'INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES ?';
    db.query(itemSql, [orderItems], (err2) => {
      if (err2) {
        console.error('Order items insert error:', err2);
        return res.send('Error saving order items');
      }
      req.session.cart = null;
        req.flash('success', 'Order is added');
        res.redirect('/pos');
    });
  });
}
};
