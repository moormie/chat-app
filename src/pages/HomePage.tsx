import { Grid, Link, Button } from "@mui/material";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { SideBar } from "../components/SideBar";

export const HomePage = () => {
  const onSendMessage = (message: string) => {};

  return (
    <>
      <SideBar />
      <Grid
        container
        width="calc(100% - 305px)"
        height="calc(100vh - 120px)"
        position="absolute"
        right={0}
        padding={2}
        boxSizing="border-box"
        rowGap={2}
      >
        <Grid container item justifyContent="flex-end" bgcolor="white" borderRadius={4} px={2}>
          <Link component={Button} underline="none" borderRadius="unset" borderBottom="2px solid">Chat</Link>
          <Link component={Button} underline="none" borderRadius="unset" color="secondary">Contacts</Link>
          <Link component={Button} underline="none" borderRadius="unset" color="secondary">Settings</Link>
        </Grid>
        <Grid
          container
          item
          direction="column"
          bgcolor="white"
          padding={4}
          borderRadius={6}
          rowGap={4}
          height="100%"
          justifyContent="flex-end"
        >
          <Grid item>
            <MessageList />
          </Grid>
          <Grid item>
            <MessageInput send={onSendMessage} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
