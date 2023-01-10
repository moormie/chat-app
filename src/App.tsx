import "./App.css";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/authContext";
import { User } from "./types/User";
import { UsersPage } from "./pages/UsersPage";

function App() {
  const { user, loading } = useAuthContext();

  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

type Props = {
  user: User | null;
  loading: boolean;
  children: JSX.Element;
};

const ProtectedRoute = ({ user, loading, children }: Props) => {
  if (loading) {
    return <></>;
  }

  if (!user) {
    return <Navigate to="/" />;
  } else return children;
};

export default App;
