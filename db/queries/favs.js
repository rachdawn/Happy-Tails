const db = require('../connection');

const getFavs = (check) => {
  return db.query(`
  SELECT listings.*, dogs.name, dogs.adoption_fee, dogs.photo_url
  FROM listings
  JOIN dogs ON dog_id = dogs.id
  WHERE listings.check = $1
  ;`, [check] )
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log("error from listings", error)
    });
};

module.exports = { getFavs };