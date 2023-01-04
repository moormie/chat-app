import { useEffect, useState } from "react";
import theme from "../theme";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useAuthContext } from "../contexts/authContext";
import { User } from "../types/User";
import { getUsers } from "../firebase/users";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { UserAvatar } from "../components/UserAvatar";

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
        <Grid
          container
          item
          direction="column"
          bgcolor="white"
          borderRadius={6}
          rowGap={4}
          height="100%"
        >
          <List sx={{ backgroundColor: "white", borderRadius: 5 }}>
            {userList.map((user) => (
              <ListItem key={user.id}>
                <ListItemButton
                  sx={{
                    borderRadius: 3,
                    backgroundColor:
                      selectedContact === user.id
                        ? theme.palette.grey[300]
                        : theme.palette.grey[100],
                  }}
                  onClick={() => onSelectContact(user.id)}
                >
                  <ListItemIcon>
                    <UserAvatar text={user.name} />
                  </ListItemIcon>
                  <ListItemText primary={user.name} />
                  <ListItemText>
                    {user.email}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
