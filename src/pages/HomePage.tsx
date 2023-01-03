import { useState } from "react";
import { Grid } from "@mui/material";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useAuthContext } from "../contexts/authContext";
import { createMessage } from "../firebase/messages";
import { useChat } from "../hooks/useChat";

export const HomePage = () => {
  const { user } = useAuthContext();

  const [selectedContact, setSelectedContact] = useState<string>();

  const chat = useChat(selectedContact);

  const onSelectContact = (contactId: string) => {
    setSelectedContact(contactId);
  };

  const onSendMessage = async (message: string) => {
    try {
      if (user && selectedContact) {
        await createMessage(message, user.id, selectedContact);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SideBar
        selectContact={onSelectContact}
        selectedContact={selectedContact}
      />
      <Grid
        container
        width="calc(100% - 305px)"
        height="calc(100vh - 120px)"
        position="absolute"
        right={0}
        padding={2}
        boxSizing="border-box"
        rowGap={2}
      >
        <Grid item xs>
          <NavBar />
        </Grid>
        <Grid
          container
          item
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
            <MessageInput send={onSendMessage} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
