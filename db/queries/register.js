const db = require('../connection');

const addUser = (username, email, password, admin) => {
  return db.query(`
    INSERT INTO users (username, email, password, is_admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  ;`, [username, email, password, admin])
    .then(data => {
      console.log("new user is ", data.rows[0])
      return data.rows[0];
    })
    .catch(error => {
      console.log("failed to save users", error)
    });
};

module.exports = { addUser };
