const db = require('../connection');

const deleteListing = (id) => {
  console.log('Deleting dog with id:', id);

  return db.query(`
    DELETE FROM dogs
    WHERE id = $1;
  `, [id])
  .catch(error => {
    console.log("Error from deleteListing:", error);
    throw error;
  });
};
module.exports = { deleteListing };