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


5.)content for header.js
import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar sx={{ backgroundColor: "blue" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "white" }}>
            <Typography>
              <LibraryBooksOutlinedIcon />
            </Typography>
          </NavLink>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add Patient" />
            <Tab LinkComponent={NavLink} to="/patient" label="Patient Information" />
            <Tab LinkComponent={NavLink} to="/about" label="About MERN Health" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;

6.)content for AddPatient.js

import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import axios from "axios";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
const AddPatient = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
      name: "",
      dob: "",
      patient_id: "",
      insurance: "",
    });
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
const sendRequest = async () => {
      await axios
        .post("http://localhost:3002/patient", {
            name: String(inputs.name),
            dob: String(inputs.dob),
            patient_id: Number(inputs.patient_id),
            insurance: String(inputs.insurance),
            discharged: Boolean(checked),
        })
        .then((res) => res.data);
    };
const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs, checked);
      sendRequest().then(() => history("/patient"));
    };
return (
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={700}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight="auto"
          marginTop={10}



7.)content for About

import { Box, Typography } from "@mui/material";
import React from "react";
const About = () => {
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography sx={{ fontFamily: "fantasy" }} variant="h5">
          Cape HealthCare
        </Typography>
        <Typography sx={{ fontFamily: "fantasy" }} variant="h6">
          Established  &copy;2023
        </Typography>
      </Box>
    </div>
  );
};
export default About;


8.)Create folder titled "patient" in component folder.
inside of patient folder, create 4 files:

-patient.css
-patient.js
-patientdetail.js
-patients.js

9.)content for patient.css:

ul {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
li {
    padding: 10px;
    margin: 10px;
    width: 250px;
    max-width: 250px;
    max-height: 400px;
    list-style-type: none;
    justify-content: flex-start;
  }
.card {
    margin: auto;
    padding: 5px;
    height: 100%;
    width: 100%;
    box-shadow: 5px 5px 10px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: flex-start;
    align-content: flex-start; */
  }
.card article {
    padding: 5px;
  }
.card h3 {
    padding: 4px;
  }
.card p {
    padding: 3x;
  }

10.)CONTENT FOR PATIENT.JS:
import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Patient.css";
const Patient = (props) => {
  const history = useNavigate();
  const { _id, name, dob, insurance, patient_id, discharged} = props.patient;
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3002/patient/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/patient"));
  };
return (
    <div className="card">
      <article>Patient Name:{name}</article>
      <h3>D.O.B:{dob}</h3>
      <p>Insurance:{insurance}</p>
      <h3>Patient ID: {patient_id}</h3>
      <p>Discharged: {discharged}</p>
      <Button LinkComponent={Link} to={`/patient/${_id}`} sx={{ mt: "auto" }}>
        Update Patient Information
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete Patient Information
      </Button>
    </div>
  );
};

export default Patient;

11.)CONTENT FOR PatientDetail.js:
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
  } from "@mui/material";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
const PatientDetail = () => {
    const [inputs, setInputs] = useState();
    const id = useParams().id;
    const [checked, setChecked] = useState(false);
    const history = useNavigate();
    useEffect(() => {
      const fetchHandler = async () => {
        await axios
          .get(`http://localhost:3002/patient/${id}`)
          .then((res) => res.data)
          .then((data) => setInputs(data.patient));
      };
      fetchHandler();
    }, [id]);
    const sendRequest = async () => {
      await axios
        .put(`http://localhost:3002/patient/${id}`, {
          name: String(inputs.name),
          dob: String(inputs.dob),
          patient_id: Number(inputs.patient_id),
          insurance: String(inputs.insurance),
          discharged: Boolean(checked),
        })
        .then((res) => res.data);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      sendRequest().then(() => history("/patient"));
    };
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
return (
      <div>
        {inputs && (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              maxWidth={700}
              alignContent={"center"}
              alignSelf="center"
              marginLeft={"auto"}
              marginRight="auto"
              marginTop={10}
            >

            <FormLabel>Name:</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="name"
              />
              <FormLabel>Date of Birth:</FormLabel>
              <TextField
                value={inputs.dob}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="dob"
              />
              <FormLabel>Insurance:</FormLabel>
              <TextField
                value={inputs.insurance}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="insurance"
              />
<FormLabel>Patient ID:</FormLabel>
              <TextField
                value={inputs.patient_id}
                onChange={handleChange}
                type="number"
                margin="normal"
                fullWidth
                variant="outlined"
                name="patient_id"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                }
label="Discharged"
              />
              <Button variant="contained" type="submit">
                Update Patient Information
              </Button>
            </Box>
          </form>
        )}
      </div>
    );
  };
  export default PatientDetail;

12.)content for patients.js

import React, { useEffect, useState } from "react";
import "./Patient";
import axios from "axios";
import Patient from "./Patient";
const URL = "http://localhost:3002/patient";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Patients = () => {
  const [patients, setPatients] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setPatients(data.patients));
  }, []);
  console.log(patients);
  return (
    <div>
      <ul>
        {patients &&
          patients.map((patient, i) => (
            <li key={i}>
              <Patient patient={patient} />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Patients;

13.)content for App.js

import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddPatient from "./components/AddPatient";
import Patients from "./components/patient/Patients";
import About from "./components/About";
import PatientDetail from "./components/patient/PatientDetail";
function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/add" element={<AddPatient />} exact />
          <Route path="/patient" element={<Patients/>} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/patient/:id" element={<PatientDetail  />} exact />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;

14.)content for index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);