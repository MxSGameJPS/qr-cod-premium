import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qrcode" element={<QRCodeGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
