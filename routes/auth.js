var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Customer = require('../models/customer');

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, function(email, password, done) {
  Customer.findByEmail(email, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    Customer.verifyPassword(password, user.password, function(err, result) {
      if (err) {
        return done(err);
      }
      if (!result) {
        return done(null, false);
      }
      done(null, user);
    })
  });
}));

router.post('/local/login', passport.authenticate('local'), function(req, res, next) {
  res.send({
    message: 'local login',
    user: req.user
  });
});

router.get('/local/logout', function(req, res, next) {
  req.logout();
  res.send({ message: 'local logout' });
});

router.get('/facebook', function(req, res, next) {
  res.send({ message: 'facebook' });
});

router.get('/facebook/callback', function(req, res, next) {
  res.send({ message: 'facebook callback' });
});

router.post('/facebook/token', function(req, res, next) {
  res.send({ message: 'facebook token' });
});

module.exports = router;