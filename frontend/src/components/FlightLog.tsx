import { useState, useEffect } from "react";
const FlightLog = () => {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/flightdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          console.log("error de fetch");

          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setFlightData(data);
      } catch (error) {
        console.error("Il y a eu un problème avec la requête fetch:", error);
      }
    };

    fetchUserData();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFlightData({
  //     ...flightData,
  //     [name]: value,
  //   });
  // };

  const [userData, setUserData] = useState({
    firstname: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setUserData({ firstname: data.firstname });
      } catch (error) {
        console.error("Il y a eu un problème avec la requête fetch:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2 className="p-6 text-center font-medium text-xl ">
        Carnet de vol de {userData.firstname}
      </h2>
      <div className="hidden lg:flex">
        <h1>Screen</h1>
        {flightData.map((flight: any) => (
          <div key={flight.id}>{flight.departure}</div>
        ))}
      </div>
      <div className="flex flex-col space-y-4 lg:hidden">Mobile</div>
    </div>
  );
};

export default FlightLog;
