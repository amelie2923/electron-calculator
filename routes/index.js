const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
var router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.indexView)
module.exports = router;
