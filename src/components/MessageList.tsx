import { FC } from "react";
import { Grid, Paper } from "@mui/material";
import { Message } from "./Message";

interface Props {}

export const MessageList: FC<Props> = () => {
  return (
    <Grid
      container
      direction="column"
      component={Paper}
      elevation={0}
      borderRadius={4}
      py={3}
    >
      <Grid item>
        <Message
          type="sender"
          userName="John Doe"
          message="Hi there! 👋 This is my first message!"
        />
      </Grid>
      <Grid item>
        <Message
          type="owner"
          userName="John Doe"
          message="Hi there! 👋 This is my first message!"
        />
      </Grid>
      <Grid item>
        <Message
          type="sender"
          userName="John Doe"
          message="Hi there! 👋 This is my first message!"
        />
      </Grid>
    </Grid>
  );
};
