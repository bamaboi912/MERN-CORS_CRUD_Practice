const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      dob: {
        type: String,
        required: true,
      },
      patient_id: {
        type: Number,
        required: true,
      },
      insurance: {
        type: String,
        required: true,
      },
      discharged: {
        type: Boolean,
      },

})

module.exports = mongoose.model("PatientInformation", patientSchema);