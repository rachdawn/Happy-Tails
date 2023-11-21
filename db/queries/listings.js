const db = require('../connection');

const getListings = () => {
  return db.query(`
  SELECT listings.*, dogs.name, dogs.age, dogs.breed, dogs.photo_url
  FROM listings
  JOIN dogs ON dog_id = dogs.id
  ;`)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log("error from listings", error)
    });
};

module.exports = { getListings };
