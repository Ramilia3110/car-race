import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Garage from "./pages/garage/Garage";
import Winners from "./pages/winners/Winners";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
