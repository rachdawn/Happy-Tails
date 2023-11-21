/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const app  = express();

// Router users
app.get('/', (req, res) => {
  res.render('users');
}); 

// Router Create listing
app.get('/ht_create_listing', (req, res) => {
  res.render('ht_create_listing');
}); 

// Router Favourites
app.get('/ht_favourites', (req, res) => {
  res.render('ht_favourites');
}); 

// Router Listing Id
app.get('/ht_listing_id', (req, res) => {
  res.render('ht_listing_id');
}); 

// Router log in
app.get('/ht_login', (req, res) => {
  res.render('ht_login');
}); 

// Router ht_register
app.get('/register', (req, res) => {
  res.render('register');
}); 

// Router ht_register
app.get('/index', (req, res) => {
  res.render('index');
}); 

module.exports = app;
