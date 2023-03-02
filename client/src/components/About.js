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