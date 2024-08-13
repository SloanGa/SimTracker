import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Log from "./pages/Log";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Log />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
