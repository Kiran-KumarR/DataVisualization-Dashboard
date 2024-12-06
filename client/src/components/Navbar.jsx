import React  from "react";
import { LightModeOutlined,DarkModeOutlined,Menu as MenuIcon} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";
import {AppBar,Box,IconButton,Toolbar,useTheme,} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch=useDispatch();
    const theme=useTheme();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    return (
        <AppBar
          sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* LEFT SIDE */}
            <FlexBetween>
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
              </IconButton>
            
            </FlexBetween >
    
            
        {/* RIGHT SIDE */}
        
       
          <IconButton onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}>
            <LogoutIcon    sx={{ fontSize: '25px' }} />
          </IconButton>
          </Toolbar>
        </AppBar>
      );
  
};

export default Navbar
