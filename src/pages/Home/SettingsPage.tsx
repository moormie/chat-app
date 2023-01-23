import { Grid, Typography } from "@mui/material";
import { NavBar } from "../../components/NavBar";

export const SettingsPage = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        width="100%"
        height="100%"
        position="absolute"
        right={0}
        padding={2}
        boxSizing="border-box"
        rowGap={2}
      >
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item>
          <Typography variant="h6" color="initial">
            Under construction...
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
