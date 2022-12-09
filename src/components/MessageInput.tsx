import { FC, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import theme from "../theme";
import { Input } from "./Input";

interface Props {
  send: (message: string) => void;
}

export const MessageInput: FC<Props> = ({ send }) => {
  const [text, setText] = useState("");

  return (
    <Grid container>
      <Grid container item alignItems="center" columnGap={1}>
        <Grid item xs>
          <Input onChange={setText} placeholder="Type..." />
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
