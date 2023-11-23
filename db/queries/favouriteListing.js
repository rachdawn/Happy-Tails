const db = require('../connection');

const insertFav = (user, dog) => {
  return db.query(`
  INSERT INTO favourites (user_id, dog_id, liked) 
  VALUES
  ($1, $2, true)
  ;`, [user, dog])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log("error from listings", error)
    });
};

module.exports = { insertFav };