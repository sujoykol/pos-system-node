const db = require('../db');
exports.stockReport = (req, res) => {
  const query = `
    SELECT products.name, products.stock, categories.name AS category
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    ORDER BY products.stock ASC
  `;

  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('reports/stockReport', { pageTitle: 'Stock Report', products: results });
  });
};

exports.salesReport = (req, res) => {
  const { startDate, endDate } = req.query;

  const query = `
    SELECT date, total, total_qty
    FROM sales
    WHERE date BETWEEN ? AND ?
    ORDER BY date DESC
  `;
  
  db.query(query, [startDate, endDate], (err, results) => {
    if (err) throw err;
    res.render('reports/salesReport', {   pageTitle: 'Sales Report', sales: results, startDate, endDate });
  });
};

// controllers/reportController.js

exports.customerReport = (req, res) => {
  const query = `
    SELECT customers.name, customers.email, COUNT(sales.id) AS total_sales, SUM(sales.total) AS total_amount
    FROM customers
    LEFT JOIN sales ON customers.id = sales.customer_id
    GROUP BY customers.id
    ORDER BY total_sales DESC
  `;

  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('reports/customerReport', { pageTitle: 'Customer Report',customers: results });
  });
};



