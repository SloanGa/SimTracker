import React, { useEffect } from "react";

const useAuthCheck = (setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // @ts-ignore
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/user`, {
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
