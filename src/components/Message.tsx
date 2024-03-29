import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { UserAvatar } from "./UserAvatar";

interface Props {
  userName: string;
  message: string;
  type: "sender" | "owner";
}

export const Message: FC<Props> = ({ userName, message, type }) => {
  return (
    <Grid container flexDirection={type === "owner" ? "row-reverse" : "row"}>
      <Grid item mx={2}>
        <UserAvatar text={userName} />
      </Grid>
      <Grid
        item
        minWidth={0}
        maxWidth={400}
        padding={2}
        bgcolor="#e3e3e3"
        borderRadius={
          type === "owner" ? "16px 0px 16px 16px" : "0px 16px 16px 16px"
        }
      >
        <Typography variant="subtitle1" color="initial">
          {message}
        </Typography>
      </Grid>
    </Grid>
  );
};
