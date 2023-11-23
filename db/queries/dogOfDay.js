const db = require('../connection');

const dogOfDay = (id) => {
  return db.query(`
  SELECT * FROM dogs
  WHERE name IS NOT NULL
  OFFSET random() * (SELECT count(*) FROM dogs WHERE name IS NOT NULL)
  LIMIT 1;
  `, [id])
  .catch(error => {
    console.log("Error from deleteListing:", error);
    throw error;
  });
};
module.exports = { dogOfDay };