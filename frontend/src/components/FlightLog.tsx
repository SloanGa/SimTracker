const FlightLog = ({ username = "Sloan" }) => {
  return (
    <div>
      <h2 className="p-6 text-center font-medium text-xl ">Carnet de vol de {username}</h2>
      <div className="hidden lg:flex">
        <h1>Screen</h1>
      </div>
      <div className="flex flex-col space-y-4 lg:hidden">Mobile</div>
    </div>
  );
};

export default FlightLog;
