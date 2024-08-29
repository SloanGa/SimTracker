import React, { createContext, useState, useContext } from "react";

import { UserData } from "../interfaces/UserData.interface";
import { FlightData } from "../interfaces/FlightData.interface";
interface DataContextType {
  flightAdded: boolean;
  setFlightAdded: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  flightData: FlightData[];
  setFlightData: React.Dispatch<React.SetStateAction<FlightData[]>>;
}

const defaultDataContext: DataContextType = {
  flightAdded: false,
  setFlightAdded: () => {},
  userData: {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture_url: "",
  },
  setUserData: () => {},
  flightData: [],
  setFlightData: () => {},
};

const DataContext = createContext(defaultDataContext);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [flightAdded, setFlightAdded] = useState(false);
  const [userData, setUserData] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture_url: "",
  });
  const [flightData, setFlightData] = useState<FlightData[]>([]);

  return (
    <DataContext.Provider
      value={{ flightAdded, setFlightAdded, userData, setUserData, flightData, setFlightData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
