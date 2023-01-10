import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useAuthContext } from "../contexts/authContext";
import { createMessage } from "../firebase/messages";
import { useChat } from "../hooks/useChat";
import { useContactListContext } from "../contexts/contactListContext";
import { SideBarContacts } from "../components/SideBarContacts";
import { ChatScreen } from "../components/ChatScreen";
import { useNewContact } from "../hooks/useNewContact";

export const ChatPage = () => {
  const { user } = useAuthContext();
  const { contactList } = useContactListContext();

  const { newContact } = useNewContact();

  const [selectedContact, setSelectedContact] = useState<string>();

  const { chat } = useChat(selectedContact);

  useEffect(() => {
    if (newContact) {
      setSelectedContact(newContact.id);
    } else if (!selectedContact && contactList.length > 0) {
      setSelectedContact(contactList[0].id);
    }
  }, [contactList, selectedContact, newContact]);

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
          contactList={
            newContact ? contactList.concat(newContact) : contactList
          }
          selectContact={onSelectContact}
          selectedContact={selectedContact}
        />
      </SideBar>
      <Grid
        container
        direction="column"
        width="calc(100% - 305px)"
        height="100%"
        position="absolute"
        right={0}
        padding={2}
        boxSizing="border-box"
        rowGap={2}
      >
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <ChatScreen chat={chat} sendMessage={onSendMessage} />
        </Grid>
      </Grid>
    </>
  );
};
