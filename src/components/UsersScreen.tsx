import { FC } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { User } from "../types/User";
import { UserAvatar } from "./UserAvatar";
import { useNewContact } from "../hooks/useNewContact";
import { useNavigate } from "react-router-dom";
import { HOME_CHAT } from "../constants/routes";

interface Props {
  userList: User[];
}

export const UsersScreen: FC<Props> = ({ userList }) => {
  const navigate = useNavigate();

  const { setNewContact } = useNewContact();

  const onSelectContact = (user: User) => {
    setNewContact(user);
    navigate("/" + HOME_CHAT);
  };

  return (
    <Grid
      container
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
              }}
              onClick={() => onSelectContact(user)}
            >
              <ListItemIcon>
                <UserAvatar text={user.name} />
              </ListItemIcon>
              <ListItemText primary={user.name} />
              <ListItemText>{user.email}</ListItemText>
              <CreateIcon />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
