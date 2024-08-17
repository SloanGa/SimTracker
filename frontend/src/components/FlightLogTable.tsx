import { useState, useEffect } from "react";
import ButtonToggle from "./Button/ButtonToggle";
import ModalAddFlight from "./Modal/ModalAddFlight";

const FlightLogTable = () => {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/flightdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          console.log("error de fetch");

          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setFlightData(data);
      } catch (error) {
        console.error("Il y a eu un problème avec la requête fetch:", error);
      }
    };

    fetchFlightData();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFlightData({
  //     ...flightData,
  //     [name]: value,
  //   });
  // };

  const [userData, setUserData] = useState({
    firstname: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setUserData({ firstname: data.firstname });
      } catch (error) {
        console.error("Il y a eu un problème avec la requête fetch:", error);
      }
    };

    fetchUserData();
  }, []);

  interface FlightData {
    id: number;
    date: string;
    flight_number: string;
    departure: string;
    arrival: string;
    flight_time: number;
    aircraft_name: string;
  }

  const formatFlightData = (flight: any) => {
    const date = new Date(flight.date);
    const formattedDate = date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const hours = Math.floor(flight.flight_time / 60);
    const minutes = flight.flight_time % 60;
    const flightTimeFormatted =
      hours > 0 ? `${hours}h${minutes.toString().padStart(2, "0")}` : `${minutes} minutes`;

    return {
      formattedDate,
      flightTimeFormatted,
    };
  };

  // const [isClicked, setIsClicked] = useState(false);

  // const toggleClick = () => {
  //   setIsClicked(!isClicked);
  // };

  return (
    <div className="w-11/12 m-auto ">
      <h2 className="p-6 text-center font-medium text-xl ">
        Carnet de vol de {userData.firstname}
      </h2>

      <div className="flex flex-col gap-6">
        <ButtonToggle
          props="Ajouter un vol"
          onClick={() => (document.getElementById("my_modal_3") as HTMLDialogElement)?.showModal()}
        />
        <ModalAddFlight />

        <div className="hidden lg:flex lg:overflow-x-auto">
          <table className="table table-zebra table-fixed p-8 m-auto text-center">
            <thead>
              <tr className="font-bold text-xl bg-primary text-textBtn">
                <th className="rounded-tl-xl">Dates</th>
                <th>Numéros de vol</th>
                <th>Départs</th>
                <th>Arrivées</th>
                <th>Temps de vol</th>
                <th className="rounded-tr-xl">Avions</th>
              </tr>
            </thead>
            <tbody>
              {flightData.map((flight: FlightData) => {
                const formattedFlight = formatFlightData(flight);
                return (
                  <tr
                    key={flight.id}
                    className="text-lg even:bg-customZebraEven odd:bg-customZebraOdd"
                  >
                    <td>{formattedFlight.formattedDate}</td>
                    <td>{flight.flight_number}</td>
                    <td>{flight.departure}</td>
                    <td>{flight.arrival}</td>
                    <td>{formattedFlight.flightTimeFormatted}</td>
                    <td>{flight.aircraft_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 lg:hidden">
          {flightData.map((flight: any, index: number) => {
            const formattedFlight = formatFlightData(flight);
            return (
              <div
                key={flight.id}
                className={`flex flex-col gap-2 p-4 rounded-lg text-center text-lg 
          ${index % 2 === 0 ? "bg-customZebraEven" : "bg-customZebraOdd"} shadow-lg`}
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
          })}
        </div>
      </div>
    </div>
  );
};

export default FlightLogTable;
