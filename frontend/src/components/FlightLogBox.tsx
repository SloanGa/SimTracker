import ButtonIcon from "./Button/ButtonIcon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "./Modal/ModalConfirm";
import { FlightLogBoxProps } from "../interfaces/FlightLogBoxPRops.interface";

const FlightLogBox: React.FC<FlightLogBoxProps> = ({ flight, formatFlightData }) => {
  const formattedFlight = formatFlightData(flight);
  if (!flight) {
    return null;
  }

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
        <ModalConfirm flightId={flight.id} />
        <ButtonIcon
          onClick={() => (document.getElementById("confirm") as HTMLDialogElement)?.showModal()}
          icon={faTrash}
          label=""
          fontSize=""
        />
      </div>
    </div>
  );
};

export default FlightLogBox;
