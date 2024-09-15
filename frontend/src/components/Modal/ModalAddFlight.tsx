import { useEffect, useState } from "react";
import ButtonSubmit from "../Button/ButtonSubmit";
import ButtonToggle from "../Button/ButtonToggle";
import ErrorMessage from "../Messages/ErrorMessage";
import SucessMessage from "../Messages/SucessMessage";
import { useData } from "../../context/DataContext";

const ModalAddFlight = () => {
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const max = new Date();
    setMaxDate(max.toISOString().split("T")[0]);
  }, []);

  const [flightData, setFlightData] = useState({
    date: "",
    flight_number: "",
    departure: "",
    arrival: "",
    flight_time: "",
    aircraft: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errorHandling, setErrorHandling] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { flightAdded, setFlightAdded, userData } = useData();

  const clearFlightData = () => {
    setFlightData({
      date: "",
      flight_number: "",
      departure: "",
      arrival: "",
      flight_time: "",
      aircraft: "",
    });
  };

  const flightDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // @ts-ignore
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/flightdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(flightData),
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

      setFlightAdded(true);
      setTimeout(() => {
        setFlightAdded(false);
      }, 5000);

      const success = await res.json();
      setSuccessMessage(success.message);

      clearFlightData();
      setIsLoading(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const addSimbrief = async () => {
    const simbriefId = userData.simbrief_id;

    if (!simbriefId) {
      const error = "Veuillez ajouter votre ID SimBrief";

      setErrorHandling(true);
      setTimeout(() => {
        setErrorHandling(false);
      }, 5000);

      return setErrorMessage(error);
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://www.simbrief.com/api/xml.fetcher.php?userid=${simbriefId}&json=1`
      );

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

      const timestamp = data.api_params.date * 1000;
      const date = new Date(timestamp);
      const formattedDate = date.toISOString().split("T")[0];

      const flightTime = Math.floor(data.times.est_time_enroute / 60);

      setFlightData({
        date: formattedDate,
        flight_number: data.atc.callsign,
        departure: data.origin.icao_code,
        arrival: data.destination.icao_code,
        flight_time: String(flightTime),
        aircraft: `${data.aircraft.name} - ${data.aircraft.reg}`,
      });
      setIsLoading(false);
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
    <dialog id="addFlight" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form
          className="dialog flex flex-col gap-2 w-full lg:gap-4"
          onSubmit={flightDataSubmit}
          method="POST"
        >
          <div className="flex flex-wrap gap-4 justify-center lg:gap-10">
            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="date" className="self-start font-bold">
                Date
              </label>
              <input
                max={maxDate}
                className="input input-bordered flex items-center gap-2 justify-center"
                type="date"
                placeholder="17/08/2024"
                name="date"
                id="date"
                value={flightData.date}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="flight_number" className="self-start font-bold text-center">
                Numéro de vol
              </label>
              <input
                className="input input-bordered flex items-center gap-2 text-center"
                type="text"
                placeholder="AF68KA"
                name="flight_number"
                id="flight_number"
                value={flightData.flight_number}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="departure" className="self-start font-bold">
                Départ
              </label>
              <input
                className="input input-bordered flex items-center gap-2 text-center"
                type="text"
                placeholder="LFMN"
                name="departure"
                id="departure"
                value={flightData.departure}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="arrival" className="self-start font-bold">
                Arrivée
              </label>
              <input
                className="input input-bordered flex items-center gap-2 text-center"
                type="text"
                placeholder="LFPO"
                name="arrival"
                id="arrival"
                value={flightData.arrival}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="flight_time" className="self-start font-bold">
                Temps de vol (en minutes)
              </label>
              <input
                className="input input-bordered flex items-center gap-2 text-center"
                type="text"
                placeholder="75"
                name="flight_time"
                id="flight_time"
                value={flightData.flight_time}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-2/3 lg:w-1/4">
              <label htmlFor="aircraft" className="self-start font-bold">
                Avion
              </label>
              <input
                className="input input-bordered flex items-center gap-2 text-center"
                type="text"
                placeholder="A320 - F-GKXZ"
                name="aircraft"
                id="aircraft"
                value={flightData.aircraft}
                onChange={handleChange}
              />
            </div>
          </div>
          {flightAdded ? <SucessMessage sucessMessage={successMessage} /> : null}
          {errorHandling ? <ErrorMessage errorMessage={errorMessage} /> : null}
          {isLoading ? (
            <div className="w-full flex justify-center mt-5">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : null}
          <ButtonSubmit props={"Ajouter un vol"} />
          <ButtonToggle props="Importer avec SimBrief" onClick={addSimbrief} />
        </form>
        <form method="dialog">
          {/* if there is a button, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={clearFlightData}
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalAddFlight;
