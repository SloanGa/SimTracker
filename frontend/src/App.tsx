import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Log from "./pages/Log";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Log />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
