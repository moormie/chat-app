import { FC } from "react";
import { Login } from "../components/Login";
import { Register } from "./Register";
import { Paper, Grid, Button, Typography } from "@mui/material";

interface Props {
  type: "login" | "register";
  onSubmit: (email: string, password: string, name?: string) => void;
  navigateTo: () => void;
}

export const MainScreen: FC<Props> = ({ type, onSubmit, navigateTo }) => {
  return (
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
      {type === "login" && <Login submitLogin={onSubmit} />}
      {type === "register" && <Register submitRegister={onSubmit} />}

      <Grid item marginTop={4} textAlign={"center"}>
        <Typography variant="subtitle2" color="initial" display="inline">
          {type === "login" && "Don't have an account?"}
          {type === "register" && "Already have an account?"}
        </Typography>
      </Grid>
      <Grid item textAlign={"center"}>
        <Button variant="text" onClick={navigateTo}>
          {type === "login" && "Register"}
          {type === "register" && "Login"}
        </Button>
      </Grid>
    </Grid>
  );
};
