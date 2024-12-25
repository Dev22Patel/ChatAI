import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VortexDemoSecond } from "./pages/home-page";
import ChatPage from "./pages/search-page";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VortexDemoSecond />} />
        <Route path="/try" element={<ChatPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
