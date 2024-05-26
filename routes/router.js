const {registerUserInDB, loginUserInDB, addTodoInDB, updateTodoInDB, deleteTodoInDB} = require('../controllers/user_controller');
const router = require('express').Router();
const User = require('../models/user_model');
const {jwtAuthMiddleWare} = require('../middleware/jwt');

router.post('/api/register', registerUserInDB);

router.post('/api/login', loginUserInDB);

router.post('/api/addtodo', jwtAuthMiddleWare, addTodoInDB);

router.put('/api/updatetodo/:id', jwtAuthMiddleWare, updateTodoInDB);

router.delete('/api/deletetodo/:id', jwtAuthMiddleWare, deleteTodoInDB);

router.get('/api/users', jwtAuthMiddleWare, async (req, res) => {
     const users = await User.find();
     res.send(users)
});

module.exports = router