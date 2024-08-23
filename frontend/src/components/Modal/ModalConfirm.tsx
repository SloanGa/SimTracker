import ButtonSubmit from "../Button/ButtonSubmit";
import ButtonToggle from "../Button/ButtonToggle";
import { useData } from "../../context/DataContext";
import { useState } from "react";
import ErrorMessage from "../Messages/ErrorMessage";

const ModalConfirm = ({ flightId }: { flightId: any }) => {
  const { setFlightAdded } = useData();
  const [errorMessageDelete, setErrorMessageDelete] = useState("");
  const [errorHandling, setErrorHandling] = useState(false);

  const deleteFlight = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/deleteflight/${flightId}`, {
      method: "GET",
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

    // Re render the dom
    setFlightAdded(true);
    setTimeout(() => {
      setFlightAdded(false);
    }, 500);

    closeModals();
  };

  const closeModals = () => {
    (document.getElementById("confirm") as HTMLDialogElement).close();
    if (document.getElementById("showFlight")) {
      (document.getElementById("showFlight") as HTMLDialogElement).close();
    }
  };

  return (
    <dialog id="confirm" className="modal ">
      <div className="modal-box">
        <p className="py-4 font-bold ">
          Etes-vous sûr de vouloir supprimer les données de ce vol ?
        </p>
        <div>
          <ButtonSubmit props={"Supprimer"} onClick={deleteFlight} />
        </div>
        <ButtonToggle props={"Fermer"} onClick={closeModals} />
        {errorHandling ? <ErrorMessage errorMessage={errorMessageDelete} /> : null}
      </div>
    </dialog>
  );
};

export default ModalConfirm;
