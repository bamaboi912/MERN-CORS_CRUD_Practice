const patientSchema = require("../Models/PatientInformation");

//create function to fetch all information from db

const getAllPatients = async (req, res, next) =>{
    let patients;
    try{
        patients = await patientSchema.find()
    }catch(err){
    console.log(err)
    }
    if(!patients){
        return res.status(404).json({message: "No Patients Found"})
    }
    return res.status(200).json({patients});
};

// define function to fetch individual information from DB
const getById = async (req, res, next) =>{
    const id = req.params.id;
    let patient;
    try{
        patient = await patientSchema.findById(id);
    }catch(err){
        console.log(err)
    }
    if(!patient){
        return res.status(404).json({message: "No Patient Found"})
    }
    return res.status(200).json({patient})
};

// create function to add patient to DB 
const addPatient = async (req, res, next)=>{
    const {name, dob, insurance, patient_id, discharged} = req.body;
    let patient;
    try{
        patient = new patientSchema({
            name, 
            dob, 
            insurance, 
            patient_id, 
            discharged
        });
        await patient.save();
    }catch(err){
        console.log(err)
    }
    if(!patient){
        return res.status(500).json({message : "Unable to Add Patient"})
    }
    return res.status(201).json({patient})
};

//create function to update a value based on ID

const updatePatient = async (req, res, next) => {
    const id = req.params.id;
    const {name, dob, insurance, patient_id, discharged } = req.body;
    let patient;
    try{
        patient = await patientSchema.findByIdAndUpdate(id, {
            name, 
            dob, 
            insurance, 
            patient_id, 
            discharged
        });
        patient = await patient.save();
    }catch(err){
        console.log(err);
    }
    if(!patient){
        return res.status(404).json({message: "Unable to update by this ID value"})
    }
    return res.status(200).json({patient});
};

//create function to delete patient from DB
const deletePatient = async (req,res, next) => {
    const id = req.params.id;
    let patient;
    try{
        patient = await patientSchema.findByIdAndRemove(id);
    } catch(err){
        console.log(err);
    }
    if(!patient){
        return res.status(404).json({ message: "Unable to Delete By This ID"});
    }
    return res.status(200).json({message: "Patient Successfully Deleted"})
};

exports.getAllPatients = getAllPatients;
exports.getById = getById;
exports.addPatient = addPatient;
exports.updatePatient = updatePatient;
exports.deletePatient  = deletePatient ;