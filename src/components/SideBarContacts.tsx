import { FC } from "react";
import theme from "../theme";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Forum } from "@mui/icons-material";
import { UserAvatar } from "./UserAvatar";
import { User } from "../types/User";

interface Props {
  contactList: User[];
  selectedContact?: string;
  selectContact: (contactId: string) => void;
}

export const SideBarContacts: FC<Props> = ({
  contactList,
  selectedContact,
  selectContact,
}) => {
  return (
    <List sx={{ backgroundColor: "white", borderRadius: 5 }}>
      <ListItem>
        <ListItemButton sx={{ borderRadius: 3 }}>
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          <ListItemText primary="New Conversation" />
        </ListItemButton>
      </ListItem>
      <Divider />
      {contactList.map((contact) => (
        <ListItem key={contact.id}>
          <ListItemButton
            sx={{
              borderRadius: 3,
              backgroundColor:
                selectedContact === contact.id ? theme.palette.grey[300] : "",
            }}
            onClick={() => selectContact(contact.id)}
          >
            <ListItemIcon>
              <UserAvatar text={contact.name} />
            </ListItemIcon>
            <ListItemText primary={contact.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
