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

// Router Create listing
router.get('/ht_create_listing', (req, res) => {
  res.render('ht_create_listing');
}); 

// Router Favourites
router.get('/ht_favourites', (req, res) => {
  res.render('ht_favourites');
}); 

// Router Listing Id
router.get('/ht_listing_id', (req, res) => {
  res.render('ht_listing_id');
}); 

// Router log in
router.get('/ht_login', (req, res) => {
  res.render('ht_login');
}); 

// Router ht_register
router.get('/register', (req, res) => {
  res.render('register');
}); 

// Router ht_register
router.get('/index', (req, res) => {
  res.render('index');
}); 



module.exports = router;
