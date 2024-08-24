import React, { createContext, useState, useContext } from "react";

interface DataContextType {
  flightAdded: boolean;
  setFlightAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultDataContext: DataContextType = {
  flightAdded: false,
  setFlightAdded: () => {},
};

const DataContext = createContext(defaultDataContext);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [flightAdded, setFlightAdded] = useState(false);

  return (
    <DataContext.Provider value={{ flightAdded, setFlightAdded }}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
