'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
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

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Index route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title });
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render('ideas/edit', { idea });
  });
});

// Idea Index route
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', { ideas });
    });
});

// Process Idea Form
app.post('/ideas', (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some details' });
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => res.redirect('/ideas'));
  }
});

// Edit Form process
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    // New values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then(idea => {
      res.redirect('/ideas');
    });
  });
});

// Delete Idea
app.delete('/ideas/:id', (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    res.redirect('/ideas');
  });
});

// Server
const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
