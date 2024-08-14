import TableFlightLogScreen from "./TableFlightLogScreen";
import TableFlightLogMobile from "./TableFlightLogMobile";

const FlightLog = ({ username = "Sloan" }) => {
  return (
    <div>
      <h2 className="p-6 text-center font-medium text-xl ">Carnet de vol de {username}</h2>
      <TableFlightLogScreen />
      <TableFlightLogMobile />
    </div>
  );
};

export default FlightLog;
