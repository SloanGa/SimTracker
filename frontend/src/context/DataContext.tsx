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
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user/getuser`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: UserData = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    const fetchFlightData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/allflightsdata`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch flight data");
        }
        const data: FlightData[] = await res.json();
        setFlightData(data);
      } catch (error) {
        console.error("Failed to fetch flight data", error);
      }
    };

    fetchUserData();
    fetchFlightData();
  }, [isAuthenticated]);

  return (
    <DataContext.Provider
      value={{ flightAdded, setFlightAdded, userData, setUserData, flightData, setFlightData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
