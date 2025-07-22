const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    layout: false,
    pageTitle: 'Login',
    //error: req.flash('error')
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findByEmail(email);
  if(!email){
    req.flash('error', 'Email  needed');
      return res.redirect('/login');
  }
  if(!password)
  {
    req.flash('error','password needed');
     return res.redirect('/login');
  }

  if (!user) {
      req.flash('error', 'Invalid email ');
      return res.redirect('/login');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash('error', 'Invalid  password');
      return res.redirect('/login');
    }

  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role
  };
  res.redirect('/dashboard');
};

exports.getChangePassword = (req, res) => {
  res.render('auth/change-password', {
    pageTitle: 'Change Password'
  });
};

exports.postChangePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    req.flash('error', 'All fields are required.');
    return res.redirect('/change-password');
  }

  if (newPassword !== confirmPassword) {
    req.flash('error', 'New passwords do not match.');
    return res.redirect('/change-password');
  }

  const user = await userModel.findById(req.session.user.id);
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    req.flash('error', 'Current password is incorrect.');
    return res.redirect('/change-password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userModel.updatePassword(user.id, hashedPassword);

  req.flash('success', 'Password changed successfully.');
  res.redirect('/change-password');
};


exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};