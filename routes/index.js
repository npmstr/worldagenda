var express = require('express');
var router = express.Router();

const base = require('airtable').base('appTwRhs5DXU070nz');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
