import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Error from "../components/Error";
import FormUpdatePassword from "../components/FormUpdatePassword";
import Spinner from "../components/Spinner";

function ResetPassword() {
  const [isValidToken, setIsValidToken] = useState(true);
  const [userId, setUserId] = useState("");
  const [isloading, setIsLoading] = useState(true);
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
            setIsLoading(false);
            return;
          }
          const data = await res.json();
          setUserId(data.userId);
        } catch (error) {
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsValidToken(false);
        setIsLoading(false);
      }
    };

    fetchConfirmToken();
  }, [token]);

  if (isloading) {
    return <Spinner />;
  }

  return <div>{isValidToken ? userId && <FormUpdatePassword userId={userId} /> : <Error />}</div>;
}

export default ResetPassword;
