import { FlightData } from "./FlightLogTable";

interface FlightLogBoxProps {
  onClick?: () => void;
  flight: FlightData | null;
  formatFlightData: (flight: any) => {
    formattedDate: string;
    flightTimeFormatted: string;
  };
}

const FlightLogBox: React.FC<FlightLogBoxProps> = ({ flight, formatFlightData }) => {
  const formattedFlight = formatFlightData(flight);
  if (!flight) {
    return null;
  }
  return (
    <div
      key={flight.id}
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
    </div>
  );
};

export default FlightLogBox;
