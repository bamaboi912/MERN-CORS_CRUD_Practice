MERN FullStack Application

1.) Create Cluster and then Database and then collection.
    -navigate to MongoDBAtlas
        -create Cluster 
        -create Database    
        -create collection 

2.) Create folder stucture for application:
    - Client Folder (frontend of stack)
    -Server Folder (Backend of stack)


    *initialize repository









Backend Configuration:

3.) Create JSON for application: 
JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects 
consisting of attribute–value pairs and arrays. It is a common data format with diverse uses in electronic data interchange, including 
that of web applications with servers.

npm = npm is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager
 for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and
 paid-for private packages, called the npm registry

-Open terminal window and use the following command to create JSON FILE:

    -CD server
    - npm init -y


4.) install Backend dependencies:

command in terminal window: npm install cors mongoose express nodemon


5.) Amend package.json to assign nodemon to server file:

*amended package.json content: 

{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js" <<<<----------- modify to this value
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^6.7.4",
    "nodemon": "^2.0.20"
  }
}

6.)Create index.js file and establish communication to MongoDB (database)

content for index.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//Middleware
app.use(express.json());
const cors = require("cors");

app.use(cors());
//define backend port
const PORT = 3002

//establish link to MongoDB

mongoose.connect("mongodb+srv://bamaboi912:Student1234!@cluster0.yjjlgsl.mongodb.net/CapeHealthCare?retryWrites=true&w=majority").then(() => console.log
("Connected To Database"))
.then(()=>console.log("Backend Server Listening on Port:"+ PORT))
.then(()=>{
    app.listen(PORT)
}).catch((err)=>console.log(err));

*endofcode------>

Start server with npm command: npm start

7.) Create Folder to Hold Mongoose Model(structuring of information)

-Create folder titled "Model" in server folder, and then create file 
titled as the same name as your collection.

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

*updated repository

<------------------------------------------------------------------endofcode------------------------------------->


8.)Set Up Controllers for functionality for urls

    -create a folder titled Controllers 
    -create a file inside to hold Controllers

    content for Controllers.js

const patientSchema = require("../Models/PatientInformation");

//create function to fetch all information from db

const getAllPatients = async (req, res, next) =>{
    let patients;
    try{
        patients = await PatientSchema.find()
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
        patient = await PatientSchema.findById(id);
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
        patient = new PatientSchema({
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
        patient = await PatientSchema.findByIdAndUpdate(id, {
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
        patient = await PatientSchema.findByIdAndRemove(id);
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

*update repository
<-----------------------------------------------endofcode------------------------------------>
9.)Create Routes to assign functionality to URLS
connect for patient-Routes

const express = require("express");
const router = express.Router();
const patientControllers = require("../Controllers/patient-controllers")

//assign functionality to Url's

//localhost:3002/patient/
router.post("/", patientControllers.addPatient);

//localhost/3002/patient/:id
router.get("/:id", patientControllers.getById);

//localhost:3002/patient/:id
router.put("/:id", patientControllers.updatePatient);

//localhost:3002/patient/:id
router.delete("/:id", patientControllers.deletePatient);

module.exports = router;


<--------------------------------------------------------------------------------endofcode-------------------------------->

10.)Amend index.js to incorporate routes for CRUD processing

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//Middleware
app.use(express.json());
const cors = require("cors");

app.use(cors());
//define backend port
const PORT = 3002

//define routes

const router = require("./Routes/patient-routes");

// define url and first unique identifier
app.use("./patient", router);

//establish link to MongoDB

mongoose.connect("mongodb+srv://bamaboi912:Student1234!@cluster0.yjjlgsl.mongodb.net/CapeHealthCare?retryWrites=true&w=majority").then(() => console.log
("Connected To Database"))
.then(()=>console.log("Backend Server Listening on Port:"+ PORT))
.then(()=>{
    app.listen(PORT)
}).catch((err)=>console.log(err));



*update repository
<------------------------------------------------------------endofcode--------------------------------------------------------------->


frontend

Front End Configuration:

1.) Split terminal

Navigate to Client folder on command line in terminal window

    command: cd client

Install react and front end dependencies


Create Client Folder. 

command to install REACT: npx create-react-app .

install react router for URLS and CRUD ops: 

commnad: npm install react-router-dom@6

install MaterialUI Library to render images

command: npm install @mui/material @emotion/react @emotion/styled

then search for icons after download in search bar on smae page:

icons command: 
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

or npm install @mui/icons material


install axios: 

    npm instal axios

then npm start on command line


2.) Clear out default values

-Delete all content for app.css and app.js
-delete app.tests.js
- clear out index.css
-delete logo.svg
-delete reportwebvitals and setuptests.js
-delete the import statement of "import reportWebVitals from './reportWebVitals';" from index.js


3.) create folder stucture for front end

-create new folder titled "components" in src folder. create 4 new files inside of "components", 
Home.js, Header.js,AddPatient.js, About.js

4.)content for Home.js

import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          LinkComponent={Link}
          to="/patient"
          sx={{ marginTop: 15, background: "blue" }}
          variant="contained"
        >
          <Typography variant="h3">View Patient Information</Typography>
        </Button>
      </Box>
    </div>
  );
};
export default Home;

update repository


5.)