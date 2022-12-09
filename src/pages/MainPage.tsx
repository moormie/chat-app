import { Paper, Grid, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import "../App.css";

export const MainPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const submitLogin = (email: string, password: string) => {};

  const submitRegister = (email: string, password: string) => {};

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
    </div>
  );
};
