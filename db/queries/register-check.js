const db = require('../connection');

const getUserByEmail = (email) => {
  return db.query(`
   SELECT * FROM users
   WHERE users.email = $1 
  ;`, [email])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.log(error)
    });
};

module.exports = { getUserByEmail };
