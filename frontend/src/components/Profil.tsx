import { useState } from "react";
import { useData } from "../context/DataContext";
import ButtonSubmit from "./Button/ButtonSubmit";
import ButtonToggle from "./Button/ButtonToggle";
import ModalConfirm from "./Modal/ModalConfirm";
import { useNavigate } from "react-router-dom";
import ModalUpdateProfil from "./Modal/ModalUpdateProfil";

const Profil = () => {
  const { userData } = useData();
  const [errorMessageDelete, setErrorMessageDelete] = useState("");
  const [errorHandling, setErrorHandling] = useState(false);
  const navigate = useNavigate();

  const deleteProfil = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/deleteuser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();

        setErrorHandling(true);
        setTimeout(() => {
          setErrorHandling(false);
        }, 5000);

        setErrorMessageDelete(error.message);
        return;
      }
      navigate("/login");
    } catch (error) {
      // Afficher vue erreur en prod
    }
  };

  const closeModals = () => {
    (document.getElementById("confirm") as HTMLDialogElement).close();
    if (document.getElementById("showFlight")) {
      (document.getElementById("showFlight") as HTMLDialogElement).close();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-12 py-4 rounded-lg shadow-custom bg-white w-11/12 m-auto">
      <h1 className="font-bold text-lg">Profil</h1>
      {userData.picture_url ? (
        <img
          className="w-1/3  rounded-full p-4 md:w-1/6"
          src={`/upload/${userData.picture_url}`}
          alt="avatar"
        />
      ) : (
        <img
          className="w-1/3 rounded-full bg-slate-700  p-4 md:w-1/4"
          src="/upload/avatar.svg"
          alt="avatar"
        />
      )}

      <p>{userData.firstname}</p>
      <p>{userData.lastname}</p>
      <ButtonToggle
        props={"Modifier le profil"}
        onClick={() => (document.getElementById("updateProfil") as HTMLDialogElement)?.showModal()}
      />
      <ButtonSubmit
        props={"Supprimer le compte"}
        onClick={() => (document.getElementById("confirm") as HTMLDialogElement)?.showModal()}
      />
      <ModalConfirm
        onDelete={deleteProfil}
        onCloseModals={closeModals}
        errorHandling={errorHandling}
        errorMessageDelete={errorMessageDelete}
        text="Êtes-vous sur de vouloir supprimer votre compte ?"
      />
      <ModalUpdateProfil />
    </div>
  );
};

export default Profil;
