const db = require('../connection');

const dogOfDay = () => {
  return db.query(`
  WITH DOGGY AS (
    SELECT *
    FROM dogs
    WHERE name IS NOT NULL AND adoptable = true
    ORDER BY random()
    LIMIT 1
  )
  SELECT *
  FROM DOGGY
  WHERE EXISTS (
  SELECT 1
  FROM dogs
  WHERE dogs.id = DOGGY.id
  )
  ;`)
  .then((data) => {
    return data.rows[0];
  })
  .catch(error => {
    console.log("Error from deleteListing:", error);
    throw error;
  });
};
module.exports = { dogOfDay };