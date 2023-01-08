import { FC } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { User } from "../types/User";
import { UserAvatar } from "./UserAvatar";
import theme from "../theme";

interface Props {
  userList: User[];
  selectedId?: string;
  onSelectContact: (id: string) => void;
}

export const UsersScreen: FC<Props> = ({
  userList,
  selectedId,
  onSelectContact,
}) => {
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
                backgroundColor:
                  selectedId === user.id
                    ? theme.palette.grey[300]
                    : theme.palette.grey[100],
              }}
              onClick={() => onSelectContact(user.id)}
            >
              <ListItemIcon>
                <UserAvatar text={user.name} />
              </ListItemIcon>
              <ListItemText primary={user.name} />
              <ListItemText>{user.email}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
