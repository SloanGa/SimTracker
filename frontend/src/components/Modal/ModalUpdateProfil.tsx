import { useState } from "react";
import { useData } from "../../context/DataContext";
import ButtonSubmit from "../Button/ButtonSubmit";
import ErrorMessage from "../Messages/ErrorMessage";
import SucessMessage from "../Messages/SucessMessage";

const ModalUpdateProfil = () => {
  const [errorHandling, setErrorHandling] = useState(false);
  const [successHandling, setSuccessHandling] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useData();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
  });

  const clearUserData = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const userDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // @ts-ignore
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/updateuser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
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

      const data = await res.json();
      setUserData(data.user);

      setSuccessHandling(true);
      setTimeout(() => {
        setSuccessHandling(false);
      }, 5000);

      setSuccessMessage(data.message);

      clearUserData();

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
    <dialog id="updateProfil" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form
          className="dialog flex flex-col gap-2 w-full lg:gap-4"
          onSubmit={userDataSubmit}
          method="POST"
        >
          <div className="flex flex-wrap gap-4 justify-center lg:gap-10">
            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="lastname" className="self-start font-bold">
                Nom
              </label>
              <input
                className="input input-bordered flex items-center gap-2 justify-center"
                name="lastname"
                id="lastname"
                type="text"
                value={formData?.lastname}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="firstname" className="self-start font-bold">
                Prenom
              </label>
              <input
                className="input input-bordered flex items-center gap-2 justify-center"
                name="firstname"
                id="firstname"
                type="text"
                value={formData?.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="email" className="self-start font-bold">
                Email
              </label>
              <input
                className="input input-bordered flex items-center gap-2 justify-center"
                name="email"
                id="email"
                type="text"
                value={formData?.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="password" className="self-start font-bold">
                Mot de passe (8 caractères min.)
              </label>
              <input
                className="input input-bordered flex items-center gap-2 justify-center"
                name="password"
                id="password"
                type="password"
                value={formData?.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="confirm" className="self-start font-bold">
                Confirmer le mot de passe
              </label>
              <input
                className="input input-bordered flex items-center gap-2 justify-center"
                name="confirm"
                id="confirm"
                type="password"
                value={formData?.confirm}
                onChange={handleChange}
              />
            </div>
          </div>
          {successHandling ? <SucessMessage sucessMessage={successMessage} /> : null}
          {errorHandling ? <ErrorMessage errorMessage={errorMessage} /> : null}
          {isLoading ? (
            <div className="w-full flex justify-center mt-5">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : null}
          <ButtonSubmit props={"Modifier"} />
        </form>
        <form method="dialog">
          {/* if there is a button, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={clearUserData}
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalUpdateProfil;
