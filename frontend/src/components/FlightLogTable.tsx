import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";

import ButtonToggle from "./Button/ButtonToggle";
import ModalAddFlight from "./Modal/ModalAddFlight";
import FlightLogBox from "./FlightLogBox";
import { Pagination } from "./Pagination";
export interface FlightData {
  id: number;
  date: string;
  flight_number: string;
  departure: string;
  arrival: string;
  flight_time: number;
  aircraft_name: string;
}

const FlightLogTable = () => {
  const [flightData, setFlightData] = useState([]);

  const { flightAdded } = useData();

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flightdata`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          console.log("error de fetch"); //Inserer une vue d'erreur

          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setFlightData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlightData();
  }, [flightAdded]);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Number);

  const fetchNextFlightData = async () => {
    try {
      const page = currentPage + 1;

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/nextflightdata?currentPage=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        if (res.status === 403) {
          setMaxPage(currentPage);
          return;
        }
        console.log("error"); //Inserer une vue d'erreur
        return;
      }

      const data = await res.json();
      setFlightData(data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPreviousFlightData = async () => {
    if (currentPage > 1) {
      try {
        const page = currentPage - 1;
        setCurrentPage(page);

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/nextflightdata?currentPage=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.log("error"); //Inserer une vue d'erreur
          return;
        }

        const data = await res.json();
        setFlightData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [userData, setUserData] = useState({
    firstname: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user/getuser`, {
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

  const formatFlightData = (flight: any) => {
    if (!flight || !flight.date) {
      return {
        formattedDate: "Date non disponible",
        flightTimeFormatted: "Temps de vol non disponible",
      };
    }
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

  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);

  const selectFlight = (flight: FlightData) => {
    setSelectedFlight(flight);
  };

  useEffect(() => {
    if (selectedFlight) {
      const modalElement = document.getElementById("showFlight") as HTMLDialogElement;
      if (modalElement) {
        modalElement.showModal();
      }
    }
  }, [selectedFlight]);

  return (
    <div className="w-11/12 m-auto ">
      <h2 className="p-6 text-center font-medium text-xl ">
        Carnet de vol de {userData.firstname}
      </h2>

      <div className="flex flex-col gap-6">
        <ButtonToggle
          props="Ajouter un vol"
          onClick={() => (document.getElementById("addFlight") as HTMLDialogElement)?.showModal()}
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
                    className="text-lg even:bg-customZebraEven odd:bg-customZebraOdd cursor-pointer"
                    onClick={() => {
                      selectFlight(flight);
                      (document.getElementById("showFlight") as HTMLDialogElement)?.showModal();
                    }}
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
        <dialog id="showFlight" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <FlightLogBox flight={selectedFlight} formatFlightData={formatFlightData} />;
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </dialog>
        <div className="flex flex-col gap-4 lg:hidden">
          {flightData.map((flight) => (
            <FlightLogBox flight={flight} formatFlightData={formatFlightData} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          onNext={fetchNextFlightData}
          onPrevious={fetchPreviousFlightData}
          disabledPrevious={currentPage === 1}
          disabledNext={currentPage === maxPage}
        />
      </div>
    </div>
  );
};

export default FlightLogTable;
