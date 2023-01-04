import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useAuthContext } from "../contexts/authContext";
import { createMessage } from "../firebase/messages";
import { useChat } from "../hooks/useChat";
import { useContactListContext } from "../contexts/contactListContext";
import { SideBarContacts } from "../components/SideBarContacts";

export const HomePage = () => {
  const { user } = useAuthContext();
  const { contactList } = useContactListContext();

  const [selectedContact, setSelectedContact] = useState<string>();

  const chat = useChat(selectedContact);

  useEffect(() => {
    if (!selectedContact && contactList.length > 0) {
      setSelectedContact(contactList[0].id);
    }
  }, [contactList, selectedContact]);

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
      <SideBar>
        <SideBarContacts
          contactList={contactList}
          selectContact={onSelectContact}
          selectedContact={selectedContact}
        />
      </SideBar>
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
