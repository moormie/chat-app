import { FC, useState } from "react";
import theme from "../theme";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { UserAvatar } from "./UserAvatar";
import { Input } from "./Input";

interface Props {}

export const SideBar: FC<Props> = () => {
  const [search, setSearch] = useState("");
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          bgcolor: "transparent",
          padding: 2,
          border: "none",
          width: 272,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          marginBottom: 2,
          borderRadius: 5,
          width: 240,
          display: "flex",
          alignItems: "center",
          bgcolor: `${theme.palette.primary.main}`,
        }}
      >
        <Avatar
          children="m"
          sx={{ bgcolor: `${theme.palette.primary.dark}`, marginRight: 2 }}
        />
        <Typography variant="h6" color="initial">
          moormie
        </Typography>
      </Paper>
      <Box mb={2}>
        <Input placeholder="Search ..." onChange={setSearch} />
      </Box>
      <List sx={{ backgroundColor: "white", borderRadius: 5 }}>
        <ListItem>
          <ListItemButton sx={{ borderRadius: 3 }}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="New Conversation" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {["John Doe", "Amelia Black", "Hanna Jane", "Peter Smith"].map(
          (text, index) => (
            <ListItem key={`${text}-${index}`}>
              <ListItemButton sx={{ borderRadius: 3 }}>
                <ListItemIcon>
                  <UserAvatar text={text} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
};
