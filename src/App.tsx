import "./App.css";
import { HomePage } from "./pages/HomePage";
import { MainPage } from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
