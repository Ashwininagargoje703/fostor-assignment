import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Mobile from "../components/login/Mobile";
import { addUser } from "../store/slice/userSlice";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to store OTP
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const textFieldsRefs = Array.from({ length: otp.length }, () => useRef());

  const login = async () => {
    const otpValue = otp.join("");
    console.log(otpValue, "otp");
    const formData = new URLSearchParams();
    formData.append("phone", mobile);
    formData.append("dial_code", "+91");
    formData.append("otp", otpValue);
    console.log(formData.toString(), "hello");

    try {
      let res = await fetch(`https://staging.fastor.in/v1/pwa/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
      console.log("API Request:", res.url); // Log the API request URL
      res = await res.json();
      console.log("API Response:", res); // Log the API response
      dispatch(addUser(res.data));
    } catch (e) {
      console.error("Something went wrong", e.message);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      navigate("/");
    }
  }, [user]);
  const handleOtpChange = (index, newValue) => {
    if (index === otp.length - 1) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = newValue.slice(-1); // Get the last typed letter
        return newOtp;
      });
    } else {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = newValue.slice(-1); // Get the last typed letter
        return newOtp;
      });
      if (newValue.length > 0) {
        textFieldsRefs[index + 1].current.focus();
      }
    }
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
      {mobile === "" && otp.every((value) => value === "") && (
        <Mobile setMobile={setMobile} />
      )}
      {mobile !== "" && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign={"left"}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
            OTP Verification
          </Typography>
          <Typography sx={{ color: "#8391A1" }}>
            Enter the verification code we just sent on your Mobile Number.
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {otp.map((value, index) => (
              <Grid item key={index}>
                <TextField
                  type="text"
                  sx={{
                    width: 40,
                  }}
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  inputRef={textFieldsRefs[index]}
                />
              </Grid>
            ))}
          </Grid>
          <br />

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
            onClick={login}
          >
            Login
          </Button>

          <Typography>
            Didn’t received code? <strong>Resend</strong>
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Login;
