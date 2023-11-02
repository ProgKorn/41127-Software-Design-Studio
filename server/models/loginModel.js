const { Schema, model } = require('mongoose')

var schema = Schema

loginSchema = new schema({
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
  },
  password: {type: String, required: true},
  isAdmin: {type: Boolean, required: true},
  email: {type: String, required: true}

})

module.exports = model("Login", loginSchema)