import { FC } from "react";
import { Grid } from "@mui/material";
import { Message } from "./Message";
import { Chat } from "../types/Message";
import { useAuthContext } from "../contexts/authContext";

interface Props {
  chat: Chat[];
}

export const MessageList: FC<Props> = ({ chat }) => {
  const { user } = useAuthContext();

  return (
    <Grid container direction="column" rowGap={2}>
      {chat.map((message, index) => (
        <Grid item key={`${message.senderId}-${message.timestamp}-${index}`}>
          <Message
            type={user?.id === message.senderId ? "owner" : "sender"}
            userName={message.senderName}
            message={message.message}
          />
        </Grid>
      ))}
    </Grid>
  );
};
