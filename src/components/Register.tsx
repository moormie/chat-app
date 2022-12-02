import { FC, useState } from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../theme";

interface Props {
  submitRegister: (email: string, password: string) => void;
}

export const Register: FC<Props> = ({ submitRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const onClickRegister = () => {
    if (email && password && passwordAgain && password === passwordAgain) {
      submitRegister(email, password);
    }
  };

  return (
    <Grid container item xs direction="column">
      <Grid item>
        <Typography variant="h5" color="initial" fontWeight={"bold"}>
          Create Account
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.primary.light}>
          Please sign up to continue
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          id="email"
          label="Email"
          type={"email"}
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item>
        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          id="password_2"
          label="Password Again"
          type={showPasswordAgain ? "text" : "password"}
          variant="standard"
          margin="normal"
          fullWidth
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPasswordAgain(!showPasswordAgain)}
                  edge="end"
                >
                  {showPasswordAgain ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item textAlign={"center"} marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickRegister}
          disabled={
            !email || !password || !passwordAgain || password !== passwordAgain
          }
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};
