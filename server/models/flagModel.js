const { Int32 } = require('mongodb')
const { Schema, model } = require('mongoose')

var schema = Schema

flagSchema = new schema({
    examinee: {type: String, required: true},
    flag: {type: String, required: true},
    session: {type: String, required: true},
    session_no: {type: Number, required: true},
    status: {type: String, required: true}
})

module.exports = model("Flag", flagSchema)