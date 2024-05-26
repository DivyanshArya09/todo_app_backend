const bcrypt = require('bcrypt');

const comparePassword = async (candidatePassword, hashedPassword) => {
    try {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (err) {
      throw new Error('Error comparing passwords'); // Re-throw a more informative error
    }
  };

  module.exports = {comparePassword}