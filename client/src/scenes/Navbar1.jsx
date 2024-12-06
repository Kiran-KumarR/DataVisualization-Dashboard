import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { AppBar, IconButton, Toolbar, useTheme,Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo.png"
const Navbar1 = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
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
       
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
        <Typography
          variant="h4" color={theme.palette.secondary[300]}
          sx={{ flexGrow:6, textAlign: "center" }}
        >
          Retail Analytics Dashboard
        </Typography>

        {/* RIGHT SIDE */}
     
        {token ? (
          <IconButton
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <LogoutIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar1;
