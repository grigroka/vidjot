'use strict';
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Register Form POST
router.post('/register', (req, res) => {
  console.log(req.body);
  res.send('register');
});

module.exports = router;
