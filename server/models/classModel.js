const { Schema, model } = require('mongoose')

var schema = Schema

classSchema = new schema({

className: {type: String, required: true},
subjectId: {type: Number, required: true},
//students: [Object],
students: [{ studentId: Number, seatNumber: Number }],
examId: {type: Number, required: true},
  
})

module.exports = model("Class", classSchema)