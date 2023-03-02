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