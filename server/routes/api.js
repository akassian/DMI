const express = require('express');
const router = new express.Router();
const StringModel = require('../models/stringModel');

/** POST /   stringData => {string: newString}  */

router.post('/strings', async function prepend(req, res, next) {
  try {
    const string = await StringModel.create(req.body.string || '');
    return res.status(201).json({ string });
  } catch (err) {
    return next(err);
  }
});

/** GET / => {strings: [string1, string2, ...]}  */

router.get('/strings', async function fetch(req, res, next) {
  try {
    const strings = await StringModel.findAll();
    return res.json({ strings });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
