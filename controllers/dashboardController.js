const db = require('../db');

exports.dashboard = (req, res) => {
  const countQueries = {
    customers: 'SELECT COUNT(*) AS count FROM customers',
    products: 'SELECT COUNT(*) AS count FROM products',
    orders: 'SELECT COUNT(*) AS count FROM sales',
    suppliers: 'SELECT COUNT(*) AS count FROM suppliers'
  };

  const results = {};

  db.query(countQueries.customers, (err1, res1) => {
    results.customers = res1[0].count;
    db.query(countQueries.products, (err2, res2) => {
      results.products = res2[0].count;
      db.query(countQueries.orders, (err3, res3) => {
        results.orders = res3[0].count;
        db.query(countQueries.suppliers, (err4, res4) => {
        results.suppliers = res4[0].count;

        const query = `
    SELECT DATE(date) AS date, SUM(total) AS total
    FROM sales
    GROUP BY DATE(date)
    ORDER BY date ASC
    LIMIT 7
  `;

  db.query(query, (err5, results) => {
    if (err5) throw err5;

    const labels = results.map(r => r.date);
    const data = results.map(r => parseFloat(r.total));
     res.render('dashboard', {
          pageTitle: 'Dashboard',
          stats: results,
          labels: JSON.stringify(labels),
          data: JSON.stringify(data)
  });

       
        });
      });
    });
  });
   });
};
