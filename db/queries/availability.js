const db = require('../connection');

const adoptability = (id) => {
  return db.query(`
    UPDATE dogs
    SET adoptable = FALSE
    WHERE id = $1;
  `, [id])
  .catch(error => {
    throw error;
  });
};

module.exports = { adoptability };