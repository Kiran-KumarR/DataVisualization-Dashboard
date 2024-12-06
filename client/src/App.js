import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

import Layout from "scenes/Layout";
import Dashboard from "scenes/Dashboard";
import Login from "scenes/Login";
import Signup from "scenes/Signup";
import Products from "scenes/Products";
import Customers from "scenes/Customers";
import BreakDown from "scenes/Breakdown";
import Orders from "scenes/Orders";
import OverView from "scenes/Overview";
import ReviewsPage from "scenes/Review";

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/breakdown" element={<BreakDown />} />
            <Route path="/overview" element={<OverView />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
