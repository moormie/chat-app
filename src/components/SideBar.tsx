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
  TextField,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import SearchIcon from "@mui/icons-material/Search";
import { UserAvatar } from "./UserAvatar";

interface Props {}

export const SideBar: FC<Props> = () => {
  const [search, setSearch] = useState("");
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          bgcolor: "#e4e4e4",
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          margin: 2,
          borderRadius: 4,
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
      <TextField
        placeholder="Search messages, contacts..."
        margin="dense"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
        variant="standard"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{ margin: 3 }}
      />
      <List>
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
