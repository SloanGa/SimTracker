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

  const [errorMessageSign, setErrorMessageSign] = useState("");
  const [errorHandling, setErrorHandling] = useState(false);
  const { flightAdded, setFlightAdded } = useData();

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

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flightdata`, {
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

        setErrorMessageSign(error.message);
        return;
      }

      setFlightAdded(true);
      setTimeout(() => {
        setFlightAdded(false);
      }, 5000);

      clearFlightData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
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
          {flightAdded ? <SucessMessage sucessMessage={"Vol ajouté avec succés"} /> : null}
          {errorHandling ? <ErrorMessage errorMessage={errorMessageSign} /> : null}
          <ButtonSubmit props="Ajouter un vol" />
          <ButtonToggle props="Importer avec SimBrief" />
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
