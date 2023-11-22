// load .env data into process.env
require('dotenv').config();


// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session')

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
  );
  app.use(cookieSession({
    name: "session",
    keys: ["hamza"]
  }))
  
  app.use(express.static('public'));
  
  // Separated Routes for each Resource
  // Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const listingsQueries = require('./db/queries/listings');
const { addUser } = require('./db/queries/register');
const { getUserByEmail } = require('./db/queries/register-check');

app.get('/', (req, res) => {

  listingsQueries.getListings(200000)
  .then(listings => { 
    const template = { listings };
    
    console.log("here ", listings)
    res.render('index', template);
  })
  .catch(err => {
    console.log("coming here")
    res
      .status(500)
      .json({ error: err.message });
  });
});

app.post('/', (req, res) => {
  const { number }  = req.body;

  if (typeof number !== 'number') {
    return res.status(400).send('Please enter a valid number');
  }

    console.log(number)
    listingsQueries.getListings(number)
    .then(listings => { 
      const template = { listings };
      
      console.log("here ", listings)
      res.render('index', template);
    })
    .catch(err => {
      console.log("coming here")
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


// MOVE THESE LATER

// Login Page
app.get('/ht_login', (req, res) => {
  const userId = req.session.user_id;
  
  if (userId) {
    return res.redirect('/')
  }
  
  res.render('ht_login');
});

app.post('/ht_login', (req,res) => {
  //select query with email
  const { email, password } = req.body;
  
  return getUserByEmail(email)
  .then(user => {
    if (user.password === password) {
      req.session.user_id = user.id;
      return res.redirect("/");
    } else {
      return res.status(500).send("wrong password")
    }
  })
})

// Register Page
app.get('/ht_register', (req, res) => {
  const userId = req.session.user_id;

  if(userId) {
    res.redirect("/")
  }
  else {
    res.render('ht_register');
  }
  
});

app.post('/ht_register', (req, res) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("inputs not valid")
  }

  //check if user exists
  return getUserByEmail(email)
  .then(user => {
    console.log(email)
    if (user && user.email) {
      console.log(user.email)
      return res.status(400).send("email already in use");
    } else {
      return addUser(username, email, password)
      .then((user) => {
        return res.redirect('/ht_login')
      }).catch(err => {
        console.log("error", err);
        return res.status(500).send("please try again");
      }) 
    }
  })
})




// Create Listing Page
app.get('/ht_create_listing', (req, res) => {
  res.render('ht_create_listing');
});

// Favourites Page
app.get('/ht_favourites', (req, res) => {
  res.render('ht_favourites');
});

// Listing ID Page
app.get('/ht_listing_id', (req, res) => {
  res.render('ht_listing_id');
});

