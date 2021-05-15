const { query } = require('../db');
const db = require('../db');

async function getNamePreis() {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail');
  return {
    code: 200,
    data: rows,
  };
}

async function getZutaten(name) {
  const { rows } = await db.query(
    'SELECT zbez FROM zutat JOIN besteht USING(zid) JOIN cocktail USING(cid) WHERE cname = $1',
    [name],
  );
  if (rows.length > 0)
    return {
      code: 200,
      data: rows,
    };
  else
    return {
      code: 404,
      data: `the specified cocktail ${name} was not found in the database`,
    };
}

async function getKleinerPreis(preis) {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail WHERE preis < $1', [preis]);
  if (rows.length > 0)
    return {
      code: 200,
      data: rows,
    };
  else
    return {
      code: 404,
      data: `the specified preis ${preis} was not found in the database`,
    };
}

async function delCocktail(name) {
  const { rows } = await db.query('SELECT cid FROM cocktail WHERE cname = $1', [name]);
  for (const row of rows) {
    await db.query('DELETE FROM besteht WHERE cid = $1', [row.cid]);
    await db.query('DELETE FROM bestellt WHERE cid = $1', [row.cid]);
  }
  await db.query('DELETE FROM cocktail WHERE cname = $1', [name]);

  if (rows.length > 0)
    return {
      code: 200,
      data: 'Deleted',
    };
  else
    return {
      code: 404,
      data: `Cocktail ${name} not found!`,
    };
}

module.exports = {
  getNamePreis,
  getZutaten,
  getKleinerPreis,
  delCocktail,
};
