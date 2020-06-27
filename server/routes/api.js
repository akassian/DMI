const express = require('express');
const router = new express.Router();
const StringModel = require('../models/stringModel');
const ExpressError = require('../middlewares/expressError.js');

/** POST /strings {string} => {string}  */

router.post('/strings', async function prepend(req, res, next) {
  try {
    const string = await StringModel.create(req.body.string || '');
    return res.status(201).json({ string });
  } catch (err) {
    return next(err);
  }
});

/** GET /strings => {strings: [string1, string2, ...]}  */

router.get('/strings', async function fetch(req, res, next) {
  try {
    const strings = await StringModel.findAll();
    throw new ExpressError('Unauthorized', 400);
    return res.json({ strings });
  } catch (err) {
    console.log('NEXT');
    return next(err);
  }
});

module.exports = router;
