import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import {Link,useNavigate} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphQL/mutations';
import Navbar1 from 'scenes/Navbar1';
import { useTheme } from '@emotion/react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconButton, InputAdornment } from "@mui/material";

export default function Signup() {

  const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

  const theme=useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
      
    });
    const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
    const [emailError, setEmailError] = useState(null);
    const [signUpStatus, setSignUpStatus] = useState(null); 
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      return emailRegex.test(email);
    };
  
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format. Please enter a valid email address.");
      return;
    } else {
      setEmailError(null);
    }

    try {
      const { data } = await signupUser({
        variables: {
          userNew: formData,
        },
      });

      if (data) { 
        // Check for a successful signup
        console.log(data );
        setTimeout(() => {
          setSignUpStatus("SignUp is successful. Kindly Login!!");
          navigate("/login"); // Redirect to the login page
         
        }, 2000); // 2sec
      }
    } catch (e) {
      console.error(e);
    }
  };
  

    return (
      <>
      <Navbar1  />
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh',mt:10,ml:50 }}>
            <div sx={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', mt: 10 }}>
            
                <Typography variant="h5" color={theme.palette.secondary[300] }sx={{ml:20}}>
                    Signup!!
                </Typography>
                <form onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        type="text"
                        label="First Name"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={{ mt: 1 ,maxWidth: '400px'}}
                    />
                    <TextField
                        type="text"
                        label="Last Name"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={{ mt: 1 ,maxWidth: '400px'}}
                    />
                    <TextField
                        type="email"
                        label="Email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        error={Boolean(emailError)}
                        helperText={emailError}
                        sx={{ mt: 1 ,maxWidth: '400px'}}
                    />
                    <TextField
                                 type={passwordShown ? "text" : "password"}

                        label="Password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        fullWidth
                        required
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
                        sx={{ mt: 1 ,maxWidth: '400px'}}
                                            />
                    <Link to="/login"><p>Already have an account ?</p></Link> 
                    {data && data.signupUser && (
                        <div className=""> {data.signupUser.email} is SignedUp. You can login now!
                        </div>
                    )}
                    {error && (
                        <div className="">
                        { error.networkError ? "Network error. Please try again later." : error.message}
                        </div>
                    )}
                    <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}  sx={{ mt: 1 ,maxWidth: '400px'}}>
                    {loading ? "Signing Up..." : "Sign Up"}
                    
                    </Button>
                </form>
            </div>
        </Container>
        </>
    );
}


