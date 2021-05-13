const express = require('express');
const asyncHandler = require('express-async-handler');
const {getNamePreis} = require('../model/cocktails')

const router = express.Router();

router.get("/cocktails", asyncHandler(async (req, res) => {
    const result = await getNamePreis();
    res.status(result.code).json(result);
}))

module.exports = router;
