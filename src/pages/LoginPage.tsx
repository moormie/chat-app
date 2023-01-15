import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import "../App.css";
import { signIn } from "../firebase/userAuth";
import { useNavigate } from "react-router-dom";
import { MainScreen } from "../components/MainScreen";
import { HOME_CHAT } from "../contants/routes";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [errorMessage, serErrorMessage] = useState("");
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

  const navigateToRegister = () => {
    navigate("/register");
  };

  const submitLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate("/" + HOME_CHAT);
    } catch (error: any) {
      serErrorMessage(error.message);
    }
  };

  return (
    <div className="Main-container">
      <MainScreen
        type="login"
        onSubmit={submitLogin}
        navigateTo={navigateToRegister}
      />
      <Snackbar
        open={open || !!errorMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
