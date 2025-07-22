const db = require('../db');

exports.find = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
