import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";
import { User } from "../../types/User";
import { getUsers } from "../../firebase/users";
import { Grid } from "@mui/material";
import { UsersScreen } from "../../components/UsersScreen";
import { LoadingIndicator } from "../../components/LoadingIndicator";

export const UsersPage = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => setUserList(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <LoadingIndicator />}
      <SideBar />
      <Grid
        container
        direction="column"
        width="calc(100% - 305px)"
        height="calc(100vh - 120px)"
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
          <UsersScreen userList={userList} />
        </Grid>
      </Grid>
    </>
  );
};
