const mongoose = require('mongoose');
require('dotenv').config();


const initializeApp = require('./config/app-init-manager');

const app = initializeApp();



mongoose.connect(process.env.MONGODB_lOCAL_URL,).then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}).catch((err) => {
    console.log(err);
})


