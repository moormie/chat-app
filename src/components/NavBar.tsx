import { FC } from "react";
import { Grid, Link, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../firebase/userAuth";
import { HOME_CHAT, HOME_USERS, SETTINGS } from "../contants/routes";

interface LinkItem {
  name: string;
  navigate: string;
}

const linkList: LinkItem[] = [
  { name: "Chat", navigate: "/" + HOME_CHAT },
  { name: "Users", navigate: "/" + HOME_USERS },
  { name: "Settings", navigate: "/" + SETTINGS },
  { name: "Log Out", navigate: "" },
];

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onSelectLink = (linkItem: LinkItem) => {
    if (linkItem.name === "Log Out") {
      signOut();
      navigate("/");
    } else {
      navigate(linkItem.navigate);
    }
  };

  const isSelected = (link: string) => {
    return location.pathname === link;
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      bgcolor="white"
      borderRadius={4}
      px={2}
    >
      {linkList.map((link) => (
        <Link
          key={link.name}
          component={Button}
          underline="none"
          borderRadius="unset"
          borderBottom={isSelected(link.navigate) ? "2px solid" : "none"}
          color={isSelected(link.navigate) ? "primary" : "secondary"}
          onClick={() => onSelectLink(link)}
        >
          {link.name}
        </Link>
      ))}
    </Grid>
  );
};
