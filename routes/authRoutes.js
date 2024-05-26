const {registerUserInDB, loginUserInDB} = require('../controllers/user_controller');
const router = require('express').Router();
const User = require('../models/user_model');
const {jwtAuthMiddleWare} = require('../middleware/jwt');

router.post('/register', registerUserInDB);

router.post('/login', loginUserInDB);

router.get('/users', jwtAuthMiddleWare, async (req, res) => {
     const users = await User.find();
     res.send(users)
});
module.exports = router