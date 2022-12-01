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
  Paper, TextField
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import SearchIcon from '@mui/icons-material/Search';

interface Props {

}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const names: string[] = name.split(" ")
  const letters = names.length > 1 ? `${names[0][0]}${names[1][0]}` : name.charAt(0)
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: letters,
  };
}

export const SideBar: FC<Props> = () => {

  const [search, setSearch]= useState("");
  return <Drawer variant="permanent" anchor="left">
    <Paper elevation={0} sx={{ padding: 2, margin: 2, borderRadius: 4, width: 240, display: "flex", alignItems: "center", bgcolor: `${theme.palette.primary.light}` }}>
      <Avatar children="m" sx={{ bgcolor: `${theme.palette.primary.dark}`, marginRight: 2 }} />
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
        startAdornment: (<SearchIcon />)
      }}
      sx={{ margin: 3 }}
    />
    <List >
      <ListItem>
        <ListItemButton sx={{ borderRadius: 3 }}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="New Conversation" />
        </ListItemButton>
      </ListItem>
      <Divider />
      {['John Doe', 'Amelia Black', 'Hanna Jane', 'Peter Smith'].map((text, index) => (
        <ListItem key={`${text}-${index}`} >
          <ListItemButton sx={{ borderRadius: 3 }}>
            <ListItemIcon>
              <Avatar {...stringAvatar(text)} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
}