const db = require('../db');

async function getNamePreis() {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail');
  return {
    code: 200,
    data: rows,
  };
}


module.exports = {
    getNamePreis,

}