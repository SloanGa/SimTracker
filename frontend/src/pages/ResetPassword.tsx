import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import FormUpdatePassword from "../components/FormUpdatePassword";

function ResetPassword() {
  const [isValidToken, setIsValidToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHendling, setErrorHandling] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    const fetchResetPassword = async () => {
      setIsValidToken(true);
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
            const error = await res.json();
            if (error.message === "Ce lien est expiré") {
              setIsValidToken(false);
              console.log(error.message);
            }
          }

          // Gérer les données de réponse si nécessaire
          const data = await res.json();
          console.log("Réponse:", data);
        } catch (error) {
          console.log("Erreur de fetch:", error);
        }
      } else {
        return;
      }
    };

    fetchResetPassword();
  }, [token]);

  return (
    <div>
      {isValidToken ? <FormUpdatePassword /> : <NotFound />}
      {errorHendling ? errorMessage : null}
    </div>
  );
}

export default ResetPassword;
