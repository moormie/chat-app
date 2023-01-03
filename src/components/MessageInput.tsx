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

  const onSendMessage = () => {
    if (!!text) {
      send(text);
      setText("");
    }
  };

  return (
    <Grid container>
      <Grid container item alignItems="center" columnGap={1}>
        <Grid item xs>
          <Input value={text} onChange={setText} placeholder="Type..." />
        </Grid>
        <Grid item>
          <IconButton
            onClick={onSendMessage}
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
