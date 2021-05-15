const express = require('express');
const asyncHandler = require('express-async-handler');
const {getNamePreis, getZutaten, getKleinerPreis, delCocktail, insertCocktail} = require('../model/cocktails')

const router = express.Router();

router.get("/cocktail", asyncHandler(async (req, res) => {
    const result = await getNamePreis();
    res.status(result.code).json(result);
}))

router.get("/cocktails/:cname", asyncHandler(async (req, res) => {
    const result = await getZutaten(req.params.cname);
    res.status(result.code).json(result);
}))

router.get("/cocktail/:preis", asyncHandler(async (req, res) => {
    const result = await getKleinerPreis(req.params.preis);
    res.status(result.code).json(result);
}))

router.delete("/cocktail/:name", asyncHandler(async (req, res) => {
    const result = await delCocktail(req.params.name);
    res.status(result.code).json(result);
}))

router.post("/cocktail", asyncHandler(async (req, res) => {
    const result = await insertCocktail(req.body);
    res.status(result.code).json(result);
}))

module.exports = router;
