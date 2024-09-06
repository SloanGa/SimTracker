import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import FormUpdatePassword from "../components/FormUpdatePassword";

function ResetPassword() {
  const [isValidToken, setIsValidToken] = useState(true);
  const [userId, setUserId] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    const fetchConfirmToken = async () => {
      if (token) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/user/resetpassword/confirm?token=${token}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (!res.ok) {
            setIsValidToken(false);
            setLoading(false);
            return;
          }
          const data = await res.json();
          setUserId(data.userId);
        } catch (error) {
          setLoading(false);
        } finally {
          setLoading(false);
        }
      } else {
        setIsValidToken(false);
        setLoading(false);
      }
    };

    fetchConfirmToken();
  }, [token]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>{isValidToken ? userId && <FormUpdatePassword userId={userId} /> : <NotFound />}</div>
  );
}

export default ResetPassword;
