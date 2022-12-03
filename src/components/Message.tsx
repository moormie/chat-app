import { Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
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
        component={Paper}
        variant="outlined"
        minWidth={0}
        maxWidth={400}
        padding={2}
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
