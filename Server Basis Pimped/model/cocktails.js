const { query } = require('../db');
const db = require('../db');

async function getCocktailPreis(preis) {
  if (preis) {
    const { rows } = await db.query('SELECT cname, preis FROM cocktail WHERE preis < $1', [preis]);
    return {
      code: 200,
      data: rows,
    };
  }
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
  const zutaten = [];
  rows.filter((el) => zutaten.push(el.zbez));
  return {
    code: 200,
    data: zutaten,
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

async function insertCocktail(c) {
  const { rows } = await db.query('SELECT MAX(cid) AS max FROM cocktail');
  const cid = rows[0].max + 1;
  await db.query(
    `INSERT INTO cocktail (cid, cname, preis, zubereitung, kid, zgid, sgid)
        VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [cid, c.cname, c.preis, c.zubereitung, c.kid, c.zgid, c.sgid],
  );
  return {
    code: 200,
    data: `Inserted ${cid}`,
  };
}

async function patchPreis(name, p) {
  const newPreis = p.preis;
  await db.query('UPDATE cocktail SET preis = $1 WHERE cname = $2', [newPreis, name]);
  return {
    code: 200,
    data: `Updated to ${newPreis}`,
  };
}

module.exports = {
  getCocktailPreis,
  getZutaten,
  delCocktail,
  insertCocktail,
  patchPreis,
};
