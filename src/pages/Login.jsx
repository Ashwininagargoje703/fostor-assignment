import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Mobile from "../components/login/Mobile";
import { addUser } from "../store/slice/userSlice";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const login = async () => {
    const formData = new URLSearchParams();
    formData.append("phone", mobile);
    formData.append("dial_code", "+91");
    formData.append("otp", otp);

    try {
      let res = await fetch(`https://staging.fastor.in/v1/pwa/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
      res = await res.json();
      dispatch(addUser(res.data));
    } catch (e) {
      console.log("something went wrong", e.message);
    }
  };

  useEffect(() => {
    if (user.user_id) {
      navigate("/");
    }
  }, [user]);

  return (
    <Box>
      {mobile === "" && otp === "" && <Mobile setMobile={setMobile} />}
      {mobile !== "" && (
        <div>
          <input
            type="text"
            placeholder="enter otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button disabled={otp.length !== 6} onClick={login}>
            Login
          </button>
        </div>
      )}
    </Box>
  );
}

export default Login;
