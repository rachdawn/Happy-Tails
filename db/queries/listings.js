const db = require('../connection');

const getListings = (fee) => {
  return db.query(`
  SELECT listings.*, dogs.name, dogs.adoption_fee, dogs.photo_url, dogs.adoptable
  FROM listings
  JOIN dogs ON dog_id = dogs.id
  WHERE dogs.adoption_fee <= $1
  ;`, [fee] )
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log("error from listings", error)
    });
};

module.exports = { getListings };
