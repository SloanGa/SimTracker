import { FlightData } from "./FlightData.interface";

export interface FlightLogBoxProps {
  onClick?: () => void;
  flight: FlightData | null;
  formatFlightData: (flight: any) => {
    formattedDate: string;
    flightTimeFormatted: string;
  };
}
