const db = require('../db');

exports.paginated = (limit, offset) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.count = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as count FROM categories', (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
};

exports.create = (name) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

exports.find = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.update = (id, name) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM categories WHERE id = ?', [id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};
exports.all = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories ORDER BY name', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};


exports.count = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as count FROM categories', (err, results) => {
      if (err) return reject(err);
      resolve(results[0].count);
    });
  });
};