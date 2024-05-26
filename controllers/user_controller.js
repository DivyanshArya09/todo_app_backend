const User = require('../models/user_model');
const {comparePassword} = require('../utils/passwordManager');
const {jwtAuthMiddleWare, genrateToken} = require('../middleware/jwt');


const registerUserInDB =async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' });
    }
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        const token =  genrateToken();
        res.status(201).send({ savedUser, token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
} 

const loginUserInDB = async (req, res, next) => {
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
    }


module.exports = {registerUserInDB, loginUserInDB}