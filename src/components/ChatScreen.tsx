import { FC } from "react";
import { Grid } from "@mui/material";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { Chat } from "../types/Message";

interface Props {
  chat: Chat[];
  sendMessage: (message: string) => void;
}

export const ChatScreen: FC<Props> = ({ chat, sendMessage }) => {
  return (
    <Grid
      container
      direction="column"
      bgcolor="white"
      padding={4}
      borderRadius={6}
      rowGap={4}
      height="100%"
      justifyContent="flex-end"
    >
      <Grid item overflow="auto" height={500}>
        <MessageList chat={chat} />
      </Grid>
      <Grid item>
        <MessageInput send={sendMessage} />
      </Grid>
    </Grid>
  );
};
