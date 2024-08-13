

import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<{ message: string } | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data"); // URL complète
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="bg-red-500">{data ? data.message : "Loading..."}</h1>
    </div>
  );
}

export default App;
