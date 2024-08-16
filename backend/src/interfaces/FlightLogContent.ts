export interface FlightLogContent {
  flight_log_id: number;
  date: Date;
  flight_number: string;
  departure: string;
  arrival: string;
  alt: string;
  flight_time: number;
  aircraft_name: string;
}
