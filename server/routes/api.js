const express = require('express');
const router = new express.Router();
const StringModel = require('../models/stringModel');
/* To manually test backend error cases on frontend */
// const ExpressError = require('../middlewares/expressError.js');

/** POST /strings {string} => {string}  */

router.post('/strings', async function prepend(req, res, next) {
  try {
    /* To manually test randomized backend error cases on frontend */
    // if (Math.random() > 0.5) throw new ExpressError('Test error', 400);
    const string = await StringModel.create(req.body.string || '');
    return res.status(201).json({ string });
  } catch (err) {
    return next(err);
  }
});

/** GET /strings => {strings: [string1, string2, ...]}  */

router.get('/strings', async function fetch(req, res, next) {
  try {
    /* To manually test randomized backend error cases on frontend */
    // if (Math.random() > 0.75) throw new ExpressError('Test error', 400);
    const strings = await StringModel.findAll();
    return res.json({ strings });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
