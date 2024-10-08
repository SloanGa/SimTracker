import ButtonIcon from "./Button/ButtonIcon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "./Modal/ModalConfirm";
import { FlightLogBoxProps } from "../interfaces/FlightLogBoxPRops.interface";
import { useData } from "../context/DataContext";
import React, { useState } from "react";

const FlightLogBox: React.FC<FlightLogBoxProps> = ({ flight, formatFlightData }) => {
  const formattedFlight = formatFlightData(flight);
  const { setFlightAdded } = useData();
  const [errorMessageDelete, setErrorMessageDelete] = useState("");
  const [errorHandling, setErrorHandling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!flight) {
    return null;
  }

  const deleteFlight = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_APP_API_URL}/flightdata/deleteflight/${flight.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!res.ok) {
        const error = await res.json();

        setErrorHandling(true);
        setTimeout(() => {
          setErrorHandling(false);
        }, 5000);

        setErrorMessageDelete(error.message);
        return setIsLoading(false);
      }

      setFlightAdded(true);
      setTimeout(() => {
        setFlightAdded(false);
      }, 500);

      closeModals();
      return setIsLoading(false);
    } catch {
      setErrorHandling(true);
      setTimeout(() => {
        setErrorHandling(false);
      }, 5000);
      setErrorMessageDelete("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModals = () => {
    (document.getElementById("confirm") as HTMLDialogElement).close();
    if (document.getElementById("showFlight")) {
      (document.getElementById("showFlight") as HTMLDialogElement).close();
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-lg text-center text-lg 
          ${flight.id % 2 === 0 ? "bg-customZebraEven" : "bg-customZebraOdd"} shadow-lg`}
    >
      <div className="flex justify-between">
        <span className="font-bold">Date:</span>
        <span>{formattedFlight.formattedDate}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Numéro de vol:</span>
        <span>{flight.flight_number}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Départ:</span>
        <span>{flight.departure}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Arrivée:</span>
        <span>{flight.arrival}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Temps de vol:</span>
        <span>{formattedFlight.flightTimeFormatted}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Avion:</span>
        <span>{flight.aircraft_name}</span>
      </div>
      <div className="flex gap-10 justify-center">
        <ButtonIcon
          onClick={() => (document.getElementById("confirm") as HTMLDialogElement)?.showModal()}
          icon={faTrash}
          label=""
          fontSize=""
        />
      </div>
      <ModalConfirm
        onCloseModals={closeModals}
        onDelete={deleteFlight}
        errorHandling={errorHandling}
        errorMessageDelete={errorMessageDelete}
        text="Êtes-vous sûr de vouloir supprimer ce vol ?"
        isLoading={isLoading}
      />
    </div>
  );
};

export default FlightLogBox;
