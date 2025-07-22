const db = require('../db');
const PDFDocument = require('pdfkit');


exports.listOrders = (req, res) => {
  const sql = `
    SELECT sales.*, customers.name AS customer_name
    FROM sales
    JOIN customers ON sales.customer_id = customers.id
    ORDER BY sales.date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.send('Database error');
    res.render('orders/index', {
      pageTitle: 'Orders List',
      orders: results
    });
  });
};

exports.viewOrder = (req, res) => {
  const orderId = req.params.id;
  const orderSql = `
    SELECT sales.*, customers.name AS customer_name
    FROM sales
    JOIN customers ON sales.customer_id = customers.id
    WHERE sales.id = ?
  `;
  const itemsSql = `
    SELECT oi.*, p.name AS product_name
    FROM sale_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.sale_id = ?
  `;

  db.query(orderSql, [orderId], (err, orderResult) => {
    if (err || orderResult.length === 0) return res.send('Order not found');
    db.query(itemsSql, [orderId], (err2, itemResults) => {
      if (err2) return res.send('Error loading order items');
      res.render('orders/view', {
        pageTitle: 'Order Details',
        order: orderResult[0],
        items: itemResults
      });
    });
  });
};




exports.downloadInvoice = (req, res) => {
  const orderId = req.params.id;

   const orderSql = `SELECT sales.*, customers.name AS customer_name
    FROM sales JOIN customers ON sales.customer_id = customers.id WHERE sales.id = ?`;
    const itemsSql = `SELECT oi.*, p.name AS product_name FROM sale_items oi JOIN products p ON oi.product_id = p.id
    WHERE oi.sale_id = ?`;
  db.query(orderSql, [orderId], (err, orderResult) => {
    if (err || orderResult.length === 0) return res.send('Order not found');
    db.query(itemsSql, [orderId], (err2, itemResults) => {
      if (err2) return res.send('Error loading items');

      const doc = new PDFDocument();
      res.setHeader('Content-Disposition', 'attachment; filename=invoice-' + orderId + '.pdf');
      res.setHeader('Content-Type', 'application/pdf');

      doc.pipe(res);

      // Header
      doc.fontSize(20).text('INVOICE', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Order ID: ${orderResult[0].id}`);
      doc.text(`Customer: ${orderResult[0].customer_name} (${orderResult[0].phone})`);
      doc.text(`Date: ${new Date(orderResult[0].order_date)}`);
      doc.moveDown();

      // Items Table
      doc.fontSize(14).text('Items:', { underline: true });
      doc.moveDown(0.5);

      itemResults.forEach(item => {
        const line = `${item.product_name}  x${item.quantity}  @ ₹${item.price} = ₹${(item.price * item.quantity).toFixed(2)}`;
        doc.text(line);
      });

      doc.moveDown();
      doc.fontSize(14).text(`Total Quantity: ${orderResult[0].total_qty}`);
      doc.text(`Total Price: ₹${orderResult[0].total_price}`);

      doc.end();
    });
  });
};
