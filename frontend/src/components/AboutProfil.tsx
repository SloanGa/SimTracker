import { useData } from "../context/DataContext";
import { FlightData } from "../interfaces/FlightData.interface";

const AboutProfil = () => {
  const { flightData } = useData();

  const totalFlightHour = (flightData: FlightData[]): string | undefined => {
    if (flightData) {
      const flightHourSum = flightData
        .map((flight) => flight.flight_time)
        .reduce((acc, curr) => acc + curr);

      const hours = Math.floor(flightHourSum / 60);
      const minutes = flightHourSum % 60;
      const totalFlightTimeFormatted =
        hours > 0 ? `${hours}h${minutes.toString().padStart(2, "0")}` : `${minutes} minutes`;

      return totalFlightTimeFormatted;
    }
  };

  function mostFrequent(
    flightData: FlightData[],
    choice: "departure" | "arrival"
  ): string | undefined {
    if (flightData) {
      const allDepartures = flightData.map((flight) => flight[choice]);

      // Compter les occurrences des valeurs
      const frequencyMap: { [key: string]: number } = allDepartures.reduce(
        (acc: { [key: string]: number }, departure) => {
          acc[departure] = (acc[departure] || 0) + 1;
          return acc;
        },
        {}
      );

      // Trouver la valeur avec le maximum de répétitions
      let mostFrequentValue = undefined;
      let maxCount = 0;

      for (const [departure, count] of Object.entries(frequencyMap)) {
        if (count > maxCount) {
          maxCount = count;
          mostFrequentValue = departure;
        }
      }

      return mostFrequentValue;
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 px-12 py-4 rounded-lg shadow-custom bg-white w-11/12 m-auto">
      <h1 className="font-bold text-lg">A Propos</h1>
      <p>Total d'heures de vol : {totalFlightHour(flightData)}</p>
      <p>Départ le plus fréquent : {mostFrequent(flightData, "departure")}</p>
      <p>Arrivée la plus fréquente: {mostFrequent(flightData, "arrival")}</p>
      <p>Vol le plus long :</p>
      <p>Vol le plus court :</p>
    </div>
  );
};

export default AboutProfil;
