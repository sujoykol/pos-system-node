const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const catRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const customertRoutes = require('./routes/customer');
const posRoutes = require('./routes/pos');
const orderRoutes = require('./routes/orders');
const supplierRoutes = require('./routes/supplier');
const purchaseRoutes = require('./routes/purchaseRoutes');
const reportRoutes = require('./routes/report');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: 'possecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:  10 * 60 * 1000 // ✅ 24 hours in milliseconds
  }
}));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  //res.locals.user = req.session.user || null;
  next();
});

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', catRoutes);
app.use('/', productRoutes);
app.use('/', customertRoutes);
app.use('/', posRoutes);
app.use('/', orderRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/', purchaseRoutes);
app.use('/', reportRoutes);



app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});