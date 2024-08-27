import React, { createContext, useState, useContext } from "react";

import { UserData } from "../interfaces/UserData.interface";
interface DataContextType {
  flightAdded: boolean;
  setFlightAdded: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const defaultDataContext: DataContextType = {
  flightAdded: false,
  setFlightAdded: () => {},
  userData: {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture_url: "",
  },
  setUserData: () => {},
};

const DataContext = createContext(defaultDataContext);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [flightAdded, setFlightAdded] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture_url: "",
  });

  return (
    <DataContext.Provider value={{ flightAdded, setFlightAdded, userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
