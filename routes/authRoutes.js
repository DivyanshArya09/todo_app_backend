const {registerUserInDB} = require('../controllers/user_controller');
const router = require('express').Router();
const User = require('../models/user_model');
const {comparePassword} = require('../utils/passwordManager');
const {jwtAuthMiddleWare, genrateToken} = require('../middleware/jwt');


router.post('/register', registerUserInDB);

router.post('/login', async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'Please provide username and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Password' });
    }

    jwtAuthMiddleWare(req, res, next);

    
  return res.status(200).send({ user, token: genrateToken(user) });
});
module.exports = router