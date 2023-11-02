const { Schema, model } = require('mongoose')

var schema = Schema

examSchema = new schema({
  examId: { type: Number, required: true },
  examName: { type: String, required: true },
  startTime: { type: String, required: true},
  endTime: { type: String, required: true },
  details: { type: String, required: true }
})

module.exports = model("Exam", examSchema)