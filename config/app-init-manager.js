const express = require("express");
const userRoute = require('../routes/router');
const testRoute = require('../routes/test');


const intializeApp = () => {
  const app = express();
  app.use(express.json());
  app.use(userRoute);

  return app;
}


module.exports = intializeApp;
