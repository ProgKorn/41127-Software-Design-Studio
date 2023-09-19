const { Schema, model } = require('mongoose')

var schema = Schema

userSchema = new schema({
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
  },
  studentId: {type: Number, required: true},
  seatNumber: {type: Number, required: true},
  faceImageUrl: {type: String, required: true},
  email: {type: String, required: true}
  
})

module.exports = model("User", userSchema)