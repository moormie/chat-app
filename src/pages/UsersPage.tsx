import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useAuthContext } from "../contexts/authContext";
import { User } from "../types/User";
import { getUsers } from "../firebase/users";
import { Grid } from "@mui/material";
import { UsersScreen } from "../components/UsersScreen";

export const UsersPage = () => {
  const { user } = useAuthContext();
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data) => setUserList(data));
  }, []);

  const [selectedContact, setSelectedContact] = useState<string>();

  const onSelectContact = (contactId: string) => {
    setSelectedContact(contactId);
  };

  return (
    <>
      <SideBar />
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
        <Grid item>
          <UsersScreen
            userList={userList}
            selectedId={selectedContact}
            onSelectContact={onSelectContact}
          />
        </Grid>
      </Grid>
    </>
  );
};
