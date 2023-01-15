import React, { FC, useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { Message } from "./Message";
import { Chat } from "../types/Message";
import { useAuthContext } from "../contexts/authContext";
import moment from "moment";

interface Props {
  chat: Chat[];
}

export const MessageList: FC<Props> = ({ chat }) => {
  const { currentUser } = useAuthContext();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <Grid container direction="column" rowGap={2}>
      {chat.map((message, index) => (
        <React.Fragment
          key={`${message.senderId}-${message.timestamp}-${index}`}
        >
          <Grid item textAlign="center">
            <Typography variant="caption" color="initial">
              {moment(message.timestamp).format("dddd, MMM DD h:mm")}
            </Typography>
          </Grid>
          <Grid item>
            <Message
              type={currentUser?.id === message.senderId ? "owner" : "sender"}
              userName={message.senderName}
              message={message.message}
            />
          </Grid>
          <div ref={bottomRef}></div>
        </React.Fragment>
      ))}
    </Grid>
  );
};
