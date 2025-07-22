const db = require('../db');

exports.all = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM customers ORDER BY id DESC', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.paginated = (limit, offset) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM customers ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.count = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as count FROM customers', (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
};


exports.create = (name, email, phone, address) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
};

exports.find = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.update = (id, name, email, phone, address) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id],
      (err) => {
        if (err) return reject(err);
        resolve(true);
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM customers WHERE id = ?', [id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};
