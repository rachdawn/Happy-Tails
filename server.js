// load .env data into process.env
require('dotenv').config();


// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session')

const PORT = process.env.PORT || 8080;
const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE
const client = require('twilio')(accountSid, authToken);

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
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const listingsQueries = require('./db/queries/listings');
const { addUser } = require('./db/queries/register');
const { getUserByEmail } = require('./db/queries/register-check');
const { getFavs } = require('./db/queries/favs')
const { insertFav } = require('./db/queries/favouriteListing')
const { addListing } = require('./db/queries/createListing')
const { getMyListings } = require('./db/queries/getMyListings')
const { findDog } = require('./db/queries/findDog');
const { deleteListing } = require('./db/queries/deleteListing')
const { adoptability } = require('./db/queries/availability')
const { deleteFavorite } = require('./db/queries/deleteFavorite');

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
app.get("/ht_login", (req, res) => {
  const userId = req.session.user_id;

  if (userId) {
    return res.redirect("/");
  }
  res.render("ht_login");
});

app.post("/ht_login", (req, res) => {
  //select query with email
  const { email, password } = req.body;

  return getUserByEmail(email)
    .then((user) => {
      if (user.password === password) {
        req.session.user = user;
        return res.redirect("/");
      } else {
        return res.status(401).send("wrong password");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      res.status(500).send("An error occured while logging in.");
    });
});

// Logout function
app.post('/ht_logout', (req, res) => {
  req.session = null;
  res.redirect('/ht_login');
});

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
  const {username, email, password, rescuer} = req.body;
  console.log("rescuer", rescuer);

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
      return addUser(username, email, password, Boolean(rescuer))
      .then((user) => {
        return res.redirect('/ht_login')
      }).catch(err => {
        console.log("error", err);
        return res.status(500).send("please try again");
      })
    }
  })
});

app.post('/ht_favourites', (req, res) => {
  const { id } = req.session.user;
  console.log(req.body)

  insertFav(id, req.body.dog_id)
  .then(() => {
    console.log(id);
    return;
  })
})

// Create Listing Page
app.get('/ht_create_listing', (req, res) => {
  res.render('ht_create_listing')
});

// Favourites Page
app.get('/ht_favourites', (req, res) => {
  const userId = req.session.user.id;

  getFavs(userId)
  .then(listings => {
    const template = { listings };
    
    console.log(listings)
    res.render('ht_favourites', template);
  })
  .catch(err => {
    console.log("coming here")
    res
      .status(500)
      .json({ error: err.message });
  });
});

app.post('/delete-favorite/:id', (req, res) => {
  const userId = req.session.user.id;
  const { id } = req.params;

  deleteFavorite(userId, id)
    .then(() => {
      console.log('Deleted favorite with dog_id:', id);
      res.redirect('/ht_favourites');
    })
    .catch((error) => {
      console.log('Error deleting favorite:', error);
      res.status(500).send('Error deleting favorite');
    });
});

app.post('/ht_create_listing', (req, res) => {
  
  const { id } = req.session.user;
  const { name, age, breed, adoption_fee, description, photo_url} = req.body;

  addListing(id, name, age, breed, adoption_fee, description, photo_url)
  .then((newListing) => {
    console.log("new listing", newListing)
    res.redirect('/ht_my_listings')
  }).catch(err => {
    console.log("error", err)
    return res.status(500).send("did not complete listing" + err.message)
  });
});

// Listing ID Page
app.get('/ht_listing_id', (req, res) => {
  res.render('ht_listing_id');
});

// My Listings Page
app.get('/ht_my_listings', (req, res) => {
  const { id } = req.session.user;
  
  getMyListings(id)
  .then((listings) => {
    console.log(listings)
    res.render('ht_my_listings', { listings });
  }).catch(err => {
    console.log("error with your listings" + err.message);
    res.status(400).send("couldnt find your listings");
  })
});


app.get('/ht_listing/:id', (req, res) => {

  const { id } = req.params;
  console.log("id", id)

  findDog(id)
  .then((listings) => {
    console.log("dog info: ", listings);
    res.render('ht_listing_id',  { listings });
  })
  .catch((error) => {
    console.error(error);
    res.status(404).send('Dog not found');
  });
});

app.post('/delete-listing/:id', (req, res) => {
  const { id } = req.body;
  console.log("look here", id);
  console.log("look here", req.body);

  deleteListing(id)
    .then(() => {
      console.log('Deleted dog with id:', id);
      res.redirect('/ht_my_listings');
    })
    .catch((error) => {
      console.log('Error deleting dog:', error);
      res.status(500).send('Error deleting dog');
    });
});

app.post('/mark-as-taken/:id', (req, res) => {
  const { id } = req.body;
 
  adoptability(id)
  .then(() => {
    res.redirect('/ht_my_listings')
  }).catch((error) => {
    console.log("error with marking dog" + error.message)
  })
});

app.post('/send', (req, res) => {
  const username = req.session.user.username;
  const message = req.body.messages;

  client.messages
    .create({
       body: message + " FROM " + username,
       from: twilioPhone,
       to: ''
     })
    .then(message => console.log(message.sid))
    .catch(err => console.log("error with messageing", err.message))
})