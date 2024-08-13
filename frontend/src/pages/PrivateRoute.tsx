import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  props: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth-check");
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/login"); // Redirection si non authentifié
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Spinner ou indicateur de chargement
  }

  return isAuthenticated ? props : null;
};

export default PrivateRoute;
