const { Schema, model } = require('mongoose')

var schema = Schema

flagSchema = new schema({
    flagId: {type: String, required: true},
    examId: {type: Number, required: true},
    studentId: {type: Number, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true},
    sessionName: {type: String, required: true},
    timeStamp: {type: Date, required: true},
    fullRecording: { type: String, required: true},
})

/* 

Old Schema:

flagSchema = new schema({
    examinee: {type: String, required: true},
    flag: {type: String, required: true},
    session: {type: String, required: true},
    session_no: {type: Number, required: true},
    status: {type: String, required: true}
})

*/

module.exports = model("Flag", flagSchema)