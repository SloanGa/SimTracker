import { useEffect } from "react";

const useAuthCheck = (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
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
      } catch {}
    };

    checkAuth();
  }, [setIsAuthenticated]);
};

export default useAuthCheck;
