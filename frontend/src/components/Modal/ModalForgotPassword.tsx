import { useState } from "react";
import ButtonSubmit from "../Button/ButtonSubmit";
import ButtonToggle from "../Button/ButtonToggle";
import ErrorMessage from "../Messages/ErrorMessage";
import SucessMessage from "../Messages/SucessMessage";

const ModalForgotPassword = () => {
  const [userMail, setUserMail] = useState({
    email: "",
  });

  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorHandling, setErrorHandling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserMail({
      ...userMail,
      [name]: value,
    });
  };

  const closeModals = () => {
    (document.getElementById("forgot") as HTMLDialogElement).close();
  };

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userMail),
      });

      if (!res.ok) {
        const error = await res.json();

        setErrorHandling(true);
        setTimeout(() => {
          setErrorHandling(false);
        }, 5000);

        setErrorMessage(error.message);
        return setIsLoading(false);
      }

      const success = await res.json();

      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
      }, 5000);

      setSuccessMessage(success.message);
      setUserMail({ email: "" });
      return setIsLoading(false);
    } catch {
      setErrorHandling(true);
      setTimeout(() => {
        setErrorHandling(false);
      }, 5000);
      setErrorMessage("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="forgot" className="modal ">
      <form onSubmit={resetPassword} className="modal-box flex flex-col items-center gap-4">
        <h2 className="text-center text-lg">Veuillez saisir votre email</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            value={userMail.email}
            onChange={handleChange}
          />
        </label>
        <div>
          <ButtonSubmit props={"Envoyer le lien de reinitialisation"} />{" "}
        </div>
        <ButtonToggle props={"Fermer"} onClick={closeModals} />
        {emailSent ? <SucessMessage sucessMessage={successMessage} /> : null}
        {errorHandling ? <ErrorMessage errorMessage={errorMessage} /> : null}
        {isLoading ? (
          <div className="w-full flex justify-center mt-5">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : null}
      </form>
    </dialog>
  );
};

export default ModalForgotPassword;
