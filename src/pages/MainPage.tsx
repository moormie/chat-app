import {
  Paper,
  Grid,
  Button,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import "../App.css";
import { createNewUser, signIn } from "../firebase/userAuth";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [regMess, setRegMess] = useState("");
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const submitLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (error) {}
  };

  const submitRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      await createNewUser(email, password, name);
      setRegMess("User has created");
      setIsLogin(true);
    } catch (error: any) {
      setIsError(true);
      setRegMess(error.message);
    }
  };

  return (
    <div className="Main-container">
      <Grid
        component={Paper}
        container
        direction="column"
        elevation={6}
        maxWidth={460}
        minHeight={460}
        alignItems="center"
        padding={3}
        borderRadius={4}
      >
        {isLogin ? (
          <Login submitLogin={submitLogin} />
        ) : (
          <Register submitRegister={submitRegister} />
        )}
        <Grid item marginTop={4} textAlign={"center"}>
          <Typography variant="subtitle2" color="initial" display="inline">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Typography>
        </Grid>
        <Grid item textAlign={"center"}>
          <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open || !!regMess}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={isError ? "error" : "success"}>
          {regMess}
        </Alert>
      </Snackbar>
    </div>
  );
};
