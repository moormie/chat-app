import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import "../App.css";
import { createNewUser } from "../firebase/userAuth";
import { useNavigate } from "react-router-dom";
import { MainScreen } from "../components/MainScreen";

export const RegisterPage = () => {
  const navigate = useNavigate();

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

  const navigateToLogin = () => {
    navigate("/login");
  };

  const submitRegister = async (
    email: string,
    password: string,
    name?: string
  ) => {
    try {
      name && (await createNewUser(email, password, name));
      setRegMess("User has created");
      navigateToLogin();
    } catch (error: any) {
      setIsError(true);
      setRegMess(error.message);
    }
  };

  return (
    <div className="Main-container">
      <MainScreen
        type="register"
        onSubmit={submitRegister}
        navigateTo={navigateToLogin}
      />
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
