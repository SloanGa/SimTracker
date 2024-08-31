import { useData } from "../context/DataContext";
import { FlightData } from "../interfaces/FlightData.interface";

const AboutProfil = () => {
  const { flightData } = useData();

  const flightsTimes = flightData.map((flight) => flight.flight_time);

  const formatFlightHour = (flight: any) => {
    const hours = Math.floor(flight / 60);
    const minutes = flight % 60;
    const flightTimeFormatted =
      hours > 0 ? `${hours}h${minutes.toString().padStart(2, "0")}` : `${minutes} minutes`;

    return flightTimeFormatted;
  };

  const totalFlightHour = (flightData: FlightData[]): string | undefined => {
    if (flightData?.length) {
      const flightHourSum = flightsTimes.reduce((acc, curr) => acc + curr);

      return formatFlightHour(flightHourSum);
    }
    return "Aucune donnée de vol disponible";
  };

  function mostFrequent(
    flightData: FlightData[],
    choice: "departure" | "arrival"
  ): string | undefined {
    if (flightData?.length) {
      const allDepartures = flightData.map((flight) => flight[choice]);

      // Compter les occurrences des valeurs
      const frequencyMap: { [key: string]: number } = allDepartures.reduce(
        (acc: { [key: string]: number }, airport) => {
          acc[airport] = (acc[airport] || 0) + 1;
          return acc;
        },
        {}
      );

      // Trouver la valeur avec le maximum de répétitions
      let mostFrequentValue = undefined;
      let maxCount = 0;

      for (const [airport, count] of Object.entries(frequencyMap)) {
        if (count > maxCount) {
          maxCount = count;
          mostFrequentValue = airport;
        }
      }

      return mostFrequentValue;
    }
    return "Aucune donnée de vol disponible";
  }

  const findFlightTime = (type: "longest" | "shortest") => {
    if (flightData?.length) {
      const flight = flightsTimes.reduce(
        (acc, curr) => {
          if (type === "longest") {
            return acc < curr ? curr : acc;
          } else if (type === "shortest") {
            return acc > curr ? curr : acc;
          }
          return 0; // Provide an initial value for the accumulator
        },
        type === "longest" ? 0 : flightsTimes[0]
      );

      return formatFlightHour(flight);
    }

    return "Aucune donnée de vol disponible";
  };

  return (
    <div className="flex flex-col items-center gap-4 px-12 py-4 rounded-lg shadow-custom bg-white w-11/12 m-auto">
      <h1 className="font-bold text-lg">A Propos</h1>
      <p>
        Total d'heures de vol : <span className="font-bold">{totalFlightHour(flightData)} </span>
      </p>
      <p>
        Départ le plus fréquent :{" "}
        <span className="font-bold"> {mostFrequent(flightData, "departure")} </span>
      </p>
      <p>
        Arrivée la plus fréquente:{" "}
        <span className="font-bold">{mostFrequent(flightData, "arrival")} </span>
      </p>
      <p>
        Vol le plus long : <span className="font-bold"> {findFlightTime("longest")} </span>
      </p>
      <p>
        Vol le plus court : <span className="font-bold"> {findFlightTime("shortest")}</span>
      </p>
    </div>
  );
};

export default AboutProfil;
