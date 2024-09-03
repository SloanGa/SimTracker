import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "./Button/ButtonSubmit";
import ButtonToggle from "./Button/ButtonToggle";
import ErrorMessage from "./Messages/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [errorMessageLog, setErrorMessageLog] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        if (!formData.email || !formData.password) {
          setErrorMessageLog("Veuillez remplir tous les champs");
          return;
        }

        if (
          formData.email.match(
            // eslint-disable-next-line no-useless-escape
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          ) === null
        ) {
          setErrorMessageLog("Veuillez entrer un email valide");
          return;
        }

        const error = await res.json();
        setErrorMessageLog(error.message);
        setFormData({ email: formData.email, password: "" });
        return;
      }
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      //Afficher vue erreur en prod
    }
  };

  return (
    <form
      className="login flex flex-col gap-4 px-12 py-4 rounded-lg shadow-custom bg-white lg:w-1/3"
      onSubmit={loginSubmit}
    >
      <h2 className="text-center text-lg">Se connecter</h2>
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
          value={formData.email}
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
          placeholder="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <ErrorMessage errorMessage={errorMessageLog} />
      <ButtonSubmit props="Se connecter" />
      <ButtonToggle
        props="Mot de passe oublié"
        onClick={() => (document.getElementById("forgot") as HTMLDialogElement)?.showModal()}
      />
    </form>
  );
};

export default Login;
