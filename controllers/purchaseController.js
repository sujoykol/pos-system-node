
const db = require('../db');

exports.getAddPurchase = (req, res) => {
  db.query('SELECT * FROM suppliers', (err, suppliers) => {
    db.query('SELECT * FROM products', (err2, products) => {
      res.render('purchases/add', {
        pageTitle: 'New Purchase',
        suppliers,
        products
      });
    });
  });
};

exports.postAddPurchase = (req, res) => {
  const { supplier_id, invoice_number, product_ids, quantities, prices } = req.body;
  const invoice_image = req.file ? req.file.filename : null;

  const sqlPurchase = `INSERT INTO purchases (supplier_id, invoice_number, invoice_image) VALUES (?, ?, ?)`;
  db.query(sqlPurchase, [supplier_id, invoice_number, invoice_image], (err, result) => {
    if (err) throw err;

    const purchaseId = result.insertId;

    const sqlItem = `INSERT INTO purchase_items (purchase_id, product_id, quantity, purchase_price) VALUES ?`;

    const items = product_ids.map((pid, i) => [
      purchaseId,
      pid,
      quantities[i],
      prices[i]
    ]);

    db.query(sqlItem, [items], (err2) => {
      if (err2) throw err2;

      // Optional: update product stock
      items.forEach(([_, pid, qty]) => {
        db.query('UPDATE products SET stock = stock + ? WHERE id = ?', [qty, pid]);
      });

      req.flash('success', 'Purchase added successfully');
      res.redirect('/purchases');
    });
  });
};

exports.listPurchases = (req, res) => {
  const sql = `
    SELECT p.*, s.name AS supplier_name 
    FROM purchases p
    JOIN suppliers s ON p.supplier_id = s.id
    ORDER BY p.id DESC
  `;
  db.query(sql, (err, purchases) => {
    res.render('purchases/list', {
      pageTitle: 'Purchase List',
      purchases
    });
  });
};
