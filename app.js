'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();

// Connect to mongoose
mongoose
  .connect(
    'mongodb://localhost:27017/vidjot-dev',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title });
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
