import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphQL/mutations";
import Navbar1 from "scenes/Navbar1";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton, InputAdornment } from "@mui/material";
import { useDispatch } from 'react-redux';
// import { login } from "../state/authSlice"
export default function Login() {
  // const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  }; const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const theme = useTheme();
  const navigate = useNavigate();
  //const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [signinUser, { error, loading, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/dashboard");
    },
  });

  if (loading) return <h1>Loading.....</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
     // Perform authentication logic here
    // If authentication is successful, dispatch the login action
    // dispatch(login());
  };

  return (
    <>
      <Navbar1 />

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color={theme.palette.secondary[300]}
            align="center"
          >
            Login!!
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type={passwordShown ? "text" : "password"}
              label="Password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisiblity} edge="end">
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Link to="/signup">
              <p>Don't have an account ?</p>
            </Link>
            {error && <div className=""> {error.message}</div>}
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
