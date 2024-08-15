import { Navigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isProtected: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isProtected }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  useAuthCheck(setIsAuthenticated);

  if (!isProtected && isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
