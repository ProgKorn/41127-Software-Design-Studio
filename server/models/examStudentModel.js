const { Schema, model } = require('mongoose')

var schema = Schema

examStudentSchema = new schema({
  seatNo: {type: Number, required: true },
  examId: { type: Number, required: true },
  studentId: { type: Number, required: true },
  status: { type: String, required: true},
  //Can store binary data of video using buffer. Content type refers to type of video E.g. mp4
  fullRecording: { type: Buffer, required: false, contentType: String}, //
  flags: { type: [Number], required: true, default:[] }
})

module.exports = model("ExamStudent", examStudentSchema)