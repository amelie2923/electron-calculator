const path = require('path');
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);

const router = {
  isStarted: false
};

//Routes handler
const index = require('./routes/index');

/**
 * Starting web server on port 3000
 * @param {*} callback
 */
function start(callback) {
  if (router.isStarted === false) {
    init(function () {
      loadRoutes(function () {
        // starting web server
        http.listen(3000, function () {
          console.log('Application is running on port 3000');
          router.isStarted = true;
          if (typeof callback != 'undefined') {
            callback();
          }
        });
      })
    });
  }
  else {
    console.log("Application already started");
    if (typeof callback != 'undefined') {
      callback();
    }
  }
}

/**
 * Initialisation of view engine and others parameters
 * @param {*} callback
 */

function init(callback) {
  /** view engine setup*/
  expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('view engine', 'ejs');
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(express.static(path.join(__dirname, 'assets')));

  /* Keep server down */
  router.isStarted = false;
  if (typeof callback != 'undefined') {
    callback();
  }
}

/**
 * Route's management
 * @param {*} callback
 */
function loadRoutes(callback) {
  expressApp.use("/", index);
  if (typeof callback != 'undefined') {
    callback();
  }
}

module.exports = {
  start: start
};