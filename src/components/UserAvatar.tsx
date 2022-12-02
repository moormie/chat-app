import { Avatar } from "@mui/material";
import { FC } from "react";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const names: string[] = name.split(" ");
  const letters =
    names.length > 1 ? `${names[0][0]}${names[1][0]}` : name.charAt(0);
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: letters,
  };
}

interface Props {
  text: string;
}

export const UserAvatar: FC<Props> = ({ text }) => {
  return <Avatar {...stringAvatar(text)} />;
};
