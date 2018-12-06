'use strict';
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'No User Found' });
        }
      });
    })
  );
};
