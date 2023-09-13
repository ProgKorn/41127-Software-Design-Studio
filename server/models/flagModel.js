const { Schema, model } = require('mongoose')
var schema = Schema

flagSchema = new schema({
  examinee: String,
  flag: String,
  session: String,
  session_no: Int32Array,
  status: String
})

const FlagModel = model("FlaggedIncidents", flagSchema)
module.exports = FlagModel