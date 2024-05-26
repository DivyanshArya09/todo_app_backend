const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    minlength: 3 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true 
  },
  password: {
    type: String,
    required: true
  },
  todos: [
    {
      title: String,
      description: String,
    }
  ],
  firstName: String,
  lastName: String,
   
}, { timestamps: true }); 

userSchema.pre('save', async function (next) {
    const user = this; 
    if (!user.isModified('password')) {
      return next();
    }
  
    try {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      next();
    } catch (err) {
      next(err); 
    }
  });




module.exports = mongoose.model('User', userSchema);

