import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/authContext";
import { User } from "./types/User";
import { Home } from "./pages/Home";
import { HOME, LOGIN, REGISTER, SETTINGS } from "./constants/routes";
import { SettingsPage } from "./pages/Home/SettingsPage";

function App() {
  const { currentUser, loading } = useAuthContext();

  return loading ? (
    <></>
  ) : (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<Navigate to={LOGIN} />} />
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={REGISTER} element={<RegisterPage />} />
        <Route
          path={`${HOME}/*`}
          element={
            <ProtectedRoute user={currentUser} loading={loading}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={SETTINGS} element={<SettingsPage />} />
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
