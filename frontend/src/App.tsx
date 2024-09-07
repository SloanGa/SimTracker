import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Log from "./pages/Log";
import Settings from "./pages/Settings";
import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Log />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
            <Route path="/resetpassword/confirm" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
