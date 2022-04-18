const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    shoppinglist: {
      type: Array,
      required: false,
    },
  });

// export model user with UserSchema
module.exports = mongoose.model('user', User);