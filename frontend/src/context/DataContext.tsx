import React, { createContext, useState, useContext, useEffect } from "react";

import { UserData } from "../interfaces/UserData.interface";
import { FlightData } from "../interfaces/FlightData.interface";
import { useAuth } from "./AuthContext";

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
  const { isAuthenticated } = useAuth();
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // @ts-ignore
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/getuser`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: UserData = await res.json();
        setUserData(data);
      } catch {}
    };

    const fetchFlightData = async () => {
      try {
        // @ts-ignore
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/flightdata/allflightsdata`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch flight data");
        }
        const data: FlightData[] = await res.json();
        setFlightData(data);
      } catch (error) {
        //Afficher vue erreur en prod
      }
    };

    fetchUserData();
    fetchFlightData();
  }, [isAuthenticated, flightAdded]);

  return (
    <DataContext.Provider
      value={{ flightAdded, setFlightAdded, userData, setUserData, flightData, setFlightData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
