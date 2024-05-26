const express = require("express");
const userRoute = require('../routes/authRoutes');
const testRoute = require('../routes/test');


const intializeApp = () => {
    const app = express();

  // Parse JSON requests
  app.use(express.json());

  app.use(userRoute);
//   app.use("/api" ,testRoute);

  return app;
}


module.exports = intializeApp;
