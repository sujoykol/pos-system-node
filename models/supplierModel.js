const db = require('../db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM suppliers', callback);
};

exports.getById = (id, callback) => {
  db.query('SELECT * FROM suppliers WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
  db.query('INSERT INTO suppliers SET ?', data, callback);
};

exports.update = (id, data, callback) => {
  db.query('UPDATE suppliers SET ? WHERE id = ?', [data, id], callback);
};

exports.delete = (id, callback) => {
  db.query('DELETE FROM suppliers WHERE id = ?', [id], callback);
};

exports.getPaginated = (limit, offset, callback) => {
  const sql = 'SELECT * FROM suppliers LIMIT ? OFFSET ?';
  db.query(sql, [limit, offset], callback);
};

exports.getCount = (callback) => {
  db.query('SELECT COUNT(*) as total FROM suppliers', callback);
};

