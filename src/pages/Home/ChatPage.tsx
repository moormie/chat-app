import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";
import { useAuthContext } from "../../contexts/authContext";
import { createMessage } from "../../firebase/messages";
import { useChat } from "../../hooks/useChat";
import { useContactListContext } from "../../contexts/contactListContext";
import { SideBarContacts } from "../../components/SideBarContacts";
import { ChatScreen } from "../../components/ChatScreen";
import { useNewContact } from "../../hooks/useNewContact";
import { User } from "../../types/User";
import { LoadingIndicator } from "../../components/LoadingIndicator";

export const ChatPage = () => {
  const { currentUser } = useAuthContext();
  const { contactList, loading } = useContactListContext();
  const [chatContacts, setChatContacts] = useState<User[]>(contactList);

  const { newContact } = useNewContact();

  const [selectedContact, setSelectedContact] = useState<string | undefined>(
    newContact?.id
  );

  const { chat } = useChat(selectedContact);

  const onSelectContact = (contactId: string) => {
    setSelectedContact(contactId);
  };

  const onSendMessage = async (message: string) => {
    try {
      if (currentUser && selectedContact) {
        await createMessage(message, currentUser.id, selectedContact);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedContact && contactList.length > 0) {
      setSelectedContact(contactList[0].id);
    }
  }, [contactList, selectedContact]);

  useEffect(() => {
    if (newContact && !contactList.find((c) => c.id === newContact.id)) {
      setChatContacts(contactList.concat(newContact));
    } else {
      setChatContacts(contactList);
    }
  }, [newContact, contactList]);

  return (
    <>
      {loading && <LoadingIndicator />}
      <SideBar>
        <SideBarContacts
          contactList={chatContacts}
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
