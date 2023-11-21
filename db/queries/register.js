const db = require('../connection');

const addUser = (username, email, password) => {
  return db.query(`
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
  ;`, [username, email, password])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      console.log("failed to save users", error)
    });
};

module.exports = { addUser };
