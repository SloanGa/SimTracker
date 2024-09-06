import Nav from "./Nav";
import { useState } from "react";
import ErrorMessage from "./Messages/ErrorMessage";
import ButtonSubmit from "./Button/ButtonSubmit";

const FormUpdatePassword = () => {
  const [errorMessageLog, setErrorMessageLog] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const passwordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        setErrorMessageLog(error.message);
        return;
      }
      console.log(formData);
    } catch (error) {
      //Afficher vue erreur en prod
    }
  };

  return (
    <div>
      <Nav />
      <form
        className="login flex flex-col gap-4 px-12 py-4 rounded-lg shadow-custom bg-white lg:w-1/3"
        onSubmit={passwordSubmit}
      >
        <h2 className="text-center text-lg">Modifier votre mot de passe</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Confirmer mot de passe"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
          />
        </label>
        <ErrorMessage errorMessage={errorMessageLog} />
        <ButtonSubmit props="Modifier le mot de passe" />
      </form>
    </div>
  );
};

export default FormUpdatePassword;
