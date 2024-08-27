import { Navigate } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import { useAuth } from "../context/AuthContext";
import { ProtectedRouteProps } from "../interfaces/ProtectedRouteProps.interface";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  useAuthCheck(setIsAuthenticated);

  if (isAuthenticated === null) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
