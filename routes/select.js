var express = require('express');
var select = require('./select');
var router = express.Router();

/* GET users listing. */
router.use('/', function (req, res, next) {
    select.select(req, res);
});

module.exports = router;
