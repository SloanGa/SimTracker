import { useEffect } from "react";

const useAuthCheck = (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkAuth();
  }, [setIsAuthenticated]);
};

export default useAuthCheck;
