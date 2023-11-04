import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";

function Mobile({ setMobile }) {
  const [value, setValue] = useState("");

  const onNext = () => {
    setMobile(value);
    setValue(""); // Clear the input field
  };
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={isMobile ? "100vh" : "90vh"}
    >
      <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
        Enter Your Mobile Number
      </Typography>
      <Typography sx={{ color: "#8391A1" }}>
        We will send you the 4-digit verification code
      </Typography>
      <TextField
        type="text"
        label="Enter your number"
        variant="outlined"
        fullWidth={isMobile ? true : false} // Conditionally apply fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ marginBottom: "1rem" }}
        sx={{ width: isMobile ? "" : 340 }}
      />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          s
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff6d6a",
              textTransform: "none",
              borderRadius: 1.5,
              width: isMobile ? "100%" : 340,
              ":hover": {
                backgroundColor: "#ff6d6a",
              },
              // Set the button width to 100%
            }}
            // disabled={value.length !== 10}
            onClick={onNext}
          >
            Send OTP
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Mobile;
