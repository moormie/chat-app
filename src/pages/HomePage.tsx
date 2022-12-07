import { Grid, Box } from "@mui/material";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import { SideBar } from "../components/SideBar";

export const HomePage = () => {
  const onSendMessage = (message: string) => {};

  return (
    <>
      <SideBar />
      <Box
        width="calc(100% - 305px)"
        height="calc(100vh - 120px)"
        position="absolute"
        right={0}
        padding={4}
        boxSizing="border-box"
      >
        <Grid
          container
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
      </Box>
    </>
  );
};
