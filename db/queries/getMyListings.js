const db = require('../connection');

const getMyListings = (userId) => {
  return db.query(`
  SELECT dogs.*
  FROM dogs
  WHERE dogs.user_id = $1
  ;`, [userId] )
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log("error from listings", error)
    });
};

module.exports = { getMyListings };
