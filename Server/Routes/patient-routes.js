const express = require("express");
const router = express.Router();
const patientControllers = require("../Controllers/patient-controllers")

//assign functionality to Url's

//localhost:3002/patient/
router.get("/", patientControllers.getAllPatients)
//localhost:3002/patient/
router.post("/", patientControllers.addPatient);

//localhost/3002/patient/:id
router.get("/:id", patientControllers.getById);

//localhost:3002/patient/:id
router.put("/:id", patientControllers.updatePatient);

//localhost:3002/patient/:id
router.delete("/:id", patientControllers.deletePatient);

module.exports = router;

