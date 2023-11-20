/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


// Router users
router.get('/', (req, res) => {
  res.render('users');
}); 

// Router dogs
router.get('/', (req, res) => {
  res.render('dogs');
}); 

// Router listings
router.get('/', (req, res) => {
  res.render('listings');
}); 

// Router favorites
router.get('/', (req, res) => {
  res.render('favorites');
}); 

// Router admins
router.get('/', (req, res) => {
  res.render('admins');
}); 


module.exports = router;
