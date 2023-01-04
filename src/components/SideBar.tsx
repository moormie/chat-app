import { FC, useState } from "react";
import theme from "../theme";
import { Avatar, Drawer, Typography, Paper, Box } from "@mui/material";
import { PermIdentityRounded } from "@mui/icons-material";
import { Input } from "./Input";
import { useAuthContext } from "../contexts/authContext";

interface Props {
  children?: JSX.Element;
}

export const SideBar: FC<Props> = ({ children }) => {
  const { user } = useAuthContext();

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
          children={<PermIdentityRounded />}
          sx={{
            bgcolor: `${theme.palette.primary.dark}`,
            marginRight: 2,
            color: `${theme.palette.primary.light}`,
          }}
        />
        <Typography variant="h6" color="initial">
          {user?.name}
        </Typography>
      </Paper>
      <Box mb={2}>
        <Input placeholder="Search ..." onChange={setSearch} />
      </Box>
      {children}
    </Drawer>
  );
};
