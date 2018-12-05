'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Connect to mongoose
mongoose
  .connect(
    'mongodb://localhost:27017/vidjot-dev',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash middleware
app.use(flash());

// Global variables middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title });
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

// Server
const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
