const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  getCocktailPreis,
  getZutaten,
  delCocktail,
  insertCocktail,
  patchPreis,
} = require('../model/cocktails');

const router = express.Router();

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    const { preis } = req.query;
    const result = await getCocktailPreis(preis);
    res.status(result.code).json(result);
  }),
);

router.get(
  '/cocktails/:cname/zutaten',
  asyncHandler(async (req, res) => {
    const result = await getZutaten(req.params.cname);
    res.status(result.code).json(result);
  }),
);

router.delete(
  '/cocktail/:name',
  asyncHandler(async (req, res) => {
    const result = await delCocktail(req.params.name);
    res.status(result.code).json(result);
  }),
);

router.post(
  '/cocktail',
  asyncHandler(async (req, res) => {
    const result = await insertCocktail(req.body);
    res.status(result.code).json(result);
  }),
);

router.patch(
  '/cocktail/:name',
  asyncHandler(async (req, res) => {
    const result = await patchPreis(req.params.name, req.body);
    res.status(result.code).json(result);
  }),
);

module.exports = router;
