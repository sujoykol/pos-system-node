const db = require('../db');

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.updatePassword = (id, newHashedPassword) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE users SET password = ? WHERE id = ?', [newHashedPassword, id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};
