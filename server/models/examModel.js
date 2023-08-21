const { Schema, model } = require('mongoose')
var schema = Schema

examSchema = new schema({
  examID: { type: String, require: true }
})

module.exports = model("Exam", examSchema)