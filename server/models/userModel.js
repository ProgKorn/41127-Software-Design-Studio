const { Schema, model } = require('mongoose')
var schema = Schema

userShema = new schema({
  userID: { type: String, require: true }
})

module.exports = model("User", userShema)