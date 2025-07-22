const db = require('../db');

exports.paginated = (limit, offset) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id ORDER BY products.id DESC LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.count = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as count FROM products', (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
};

exports.create = (name, price,  category_id, image) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO products (name, price, category_id, image) VALUES (?, ?, ?, ?)', [name, price, category_id, image], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

exports.find = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};


exports.update = (id, name, price, category_id, image) => {
  return new Promise((resolve, reject) => {
     if(image){
    db.query('UPDATE products SET name = ?, price = ?, category_id = ?, image = ? WHERE id = ?', [name, price, category_id,image, id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  }else {
      db.query('UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?', [name, price, category_id, id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });

  }

  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};
