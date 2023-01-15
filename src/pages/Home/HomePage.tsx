import { Routes, Route } from "react-router-dom";
import { CHAT, USERS } from "../../contants/routes";
import { ChatPage } from "../ChatPage";
import { UsersPage } from "../UsersPage";

export const HomePage = () => {
  return (
    <Routes>
      <Route path={CHAT} element={<ChatPage />} />
      <Route path={USERS} element={<UsersPage />} />
    </Routes>
  );
};
