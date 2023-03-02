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
<FormLabel>Insurance</FormLabel>
          <TextField
            value={inputs.insurance}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="insurance"
          />
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
            }
            label="Discharged"
          />
<Button variant="contained" type="submit">
            Add Patient
          </Button>
        </Box>
      </form>
    );
  };
  export default AddPatient;          
