import "./App.css";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/authContext";

function App() {
  const { user } = useAuthContext();

  type Props = {
    children: JSX.Element;
  };

  const ProtectedRoute = ({ children }: Props) => {
    if (!user) {
      return <Navigate to="/" />;
    } else return children;
  };

  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
