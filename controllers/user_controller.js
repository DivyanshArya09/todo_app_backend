const User = require('../models/user_model');
const {comparePassword} = require('../utils/passwordManager');
const { genrateToken} = require('../middleware/jwt');


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
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ message: 'User not found' });
            }  
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid Password' });
            }
          return res.status(200).send({ user, token: genrateToken(user) });
        } catch (error) {
          return  res.status(400).send({ error: error.message });
        }
    }

    const addTodoInDB = async (req, res) => {
        const {title, description} = req.body;
        if (!title || !description) {
            return res.status(400).send({ message: 'Please provide title and description' });
        }
        try {
            const user = await User.findOne({ _id: req.user.user._id });
            user.todos.push({title, description});
            await user.save();
            res.send({user});
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    const deleteTodoInDB = async (req, res) => {
        const {id} = req.params;
        const todo = await User.findOne({ _id: req.user.user._id, 'todos._id': id });
        if (!todo) {
            return res.status(400).send({ message: 'Todo not found' });
        }
        console.log('===========> todo', todo);
        todo.todos.id(id).deleteOne();
        await todo.save();
        res.status(200).json({todo});
    }

    const updateTodoInDB = async (req, res) => {
        const {id} = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Please provide id' });
        }
        const {title, description} = req.body;
        const todo = await User.findOne({ _id: req.user.user._id, 'todos._id': id });
        console.log('===========> todo', todo);
        if (!todo) {
            return res.status(400).send({ message: 'Todo not found' });
        }
        todo.todos.id(id).title = title;
        todo.todos.id(id).description = description;
        await todo.save();
        res.send({todo});
    }


module.exports = {registerUserInDB, loginUserInDB, addTodoInDB, updateTodoInDB, deleteTodoInDB}