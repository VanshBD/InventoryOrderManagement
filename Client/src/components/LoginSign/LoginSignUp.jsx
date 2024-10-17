import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Snackbar, Alert } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import apiHelper from "../../Commen/ApiHelper";
import Constents from "../../Commen/Constents";
import { Path } from "../../Commen/Path";

const LoginSignUp = ({ Auth, setAuth }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [userCity, setuserCity] = useState([]);
  const [userDetails, setuserDetails] = useState({
    fullName: "",
    city: "",
    phone: "",
    role: 2,
    password: ""
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    if (Auth && Auth.role === 2) {
      navigate(Path.homescreen);
    }

    // eslint-disable-next-line
  }, [Auth]);

  const getUsers = async () => {
    try {
      const result = await apiHelper.listUser(userCity.length < 0 ? undefined : userCity);
      setuserCity([...result.data.data]);
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: "Failed to fetch users", severity: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const LoginHandeler = async () => {
    try {
      if (!userDetails.phone || userDetails.phone.length < 10) {
        setSnackbar({ open: true, message: "Invalid phone number", severity: "error" });
        return;
      }
      if (!userDetails.password) {
        setSnackbar({ open: true, message: "Password is required", severity: "error" });
        return;
      }
      const result = await apiHelper.userLogin({ phone: userDetails.phone, password: userDetails.password });
      localStorage.setItem("token", result.data.token);
      setAuth(Constents.getUserDetails());
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      navigate(Path.homescreen);
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: error.response?.data?.message || "Login failed", severity: "error" });
    }
  };

  const InsetHandler = async () => {
    try {
      if (!userDetails.fullName || userDetails.fullName.length < 4) {
        setSnackbar({ open: true, message: "Full name must be at least 4 characters", severity: "error" });
        return;
      }
      if (!userDetails.city) {
        setSnackbar({ open: true, message: "City is required", severity: "error" });
        return;
      }
      if (!userDetails.phone) {
        setSnackbar({ open: true, message: "Phone number is required", severity: "error" });
        return;
      }
      if (!userDetails.password) {
        setSnackbar({ open: true, message: "Password is required", severity: "error" });
        return;
      }
      await apiHelper.createUser({ ...userDetails });
      setActiveTab("tabButton1");
      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: error.response?.data?.message || "Registration failed", severity: "error" });
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line 
  }, []);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              style={{ fontSize: 23 }}
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              style={{ fontSize: 23 }}
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* tab1 */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <Stack
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    inputProps={{ maxLength: 10 }}
                    id="outlined-number"
                    label="Phone Number"
                    type="text"
                    variant="filled"
                    value={userDetails.phone}
                    onChange={(e) => setuserDetails({ ...userDetails, phone: e.target.value })}
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    value={userDetails.password}
                    onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
                  />
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<LoginIcon />}
                    size="large"
                    onClick={LoginHandeler}
                  >
                    LogIn
                  </Button>
                </Stack>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 */}
            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <Stack
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-text"
                    label="Full Name"
                    type="text"
                    variant="filled"
                    onChange={(e) => setuserDetails({ ...userDetails, fullName: e.target.value })}
                  />
                  <TextField
                    inputProps={{ maxLength: 10 }}
                    id="outlined-number"
                    label="Phone Number"
                    type="text"
                    variant="filled"
                    onChange={(e) => setuserDetails({ ...userDetails, phone: Number(e.target.value) || "" })}
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
                  />
                  {/* <FormControl variant="filled" size="large">
                    <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
                    <Select
                      value={userDetails.city}
                      fullWidth
                      onChange={(e) => setuserDetails({ ...userDetails, city: e.target.value })}
                    >
                      {userCity && userCity?.map((x) => (
                        <MenuItem key={x._id} value={x.city}>{x.city}</MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                 <FormControl variant="filled" size="large" fullWidth>
  <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
  <Select
    labelId="demo-simple-select-filled-label"
    value={userDetails.city}
    onChange={(e) => setuserDetails({ ...userDetails, city: e.target.value })}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 300,
          width: 300,  // Increase the width to accommodate long text
        },
      },
    }}
  >
    {userCity && userCity.map((x) => (
      <MenuItem
        key={x._id}
        value={x.city}
        style={{ whiteSpace: 'normal' }}  // Allow text to wrap
      >
        {x.city}
      </MenuItem>
    ))}
  </Select>
</FormControl>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<LoginIcon />}
                    size="large"
                    onClick={InsetHandler}
                  >
                    Sign Up
                  </Button>
                </Stack>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    Have an account?{" "}
                    <span onClick={() => handleTab("tabButton1")}>
                      Login
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginSignUp;


