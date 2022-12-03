import { FC, useState } from "react";
import { Grid, TextField, Paper, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import theme from "../theme";

interface Props {
  send: (message: string) => void;
}

export const MessageInput: FC<Props> = ({ send }) => {
  const [text, setText] = useState("");

  return (
    <Grid container>
      <Grid container item alignItems="center" columnGap={1}>
        <Grid item xs component={Paper} variant="outlined" borderRadius={6}>
          <TextField
            id="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            placeholder="Type..."
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 5,
              },
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => send(text)}
            size="large"
            sx={{
              bgcolor: `${theme.palette.primary.light}`,
              ":hover": {
                bgcolor: `${theme.palette.primary.light}`,
                opacity: 0.8,
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};
