const User = require('../models/user_model');
const {genrateToken} = require('../middleware/jwt');

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

module.exports = {registerUserInDB}