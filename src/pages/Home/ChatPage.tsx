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
  const [selectedContactId, setSelectedContactId] = useState<
    string | undefined
  >(newContact?.id);
  const { chat } = useChat(selectedContactId);
  const [search, setSearch] = useState("");

  const onSendMessage = async (message: string) => {
    try {
      if (currentUser && selectedContactId) {
        await createMessage(message, currentUser.id, selectedContactId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let resultList = contactList;
    if (newContact && !contactList.find((c) => c.id === newContact.id)) {
      resultList = resultList.concat(newContact);
    }
    if (search) {
      resultList = resultList.filter((c) =>
        c.name.toLowerCase().includes(search)
      );
    }
    setChatContacts(resultList);
    if (!selectedContactId && contactList.length > 0) {
      setSelectedContactId(contactList[0].id);
    }
  }, [newContact, contactList, search, selectedContactId]);

  return (
    <>
      {loading && <LoadingIndicator />}
      <SideBar onChange={setSearch}>
        <SideBarContacts
          contactList={chatContacts}
          selectContact={setSelectedContactId}
          selectedContact={selectedContactId}
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
