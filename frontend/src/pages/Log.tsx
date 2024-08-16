import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ButtonToggle from "../components/Button/ButtonToggle";

const Log = () => {
  const [isClicked, setIsClicked] = useState(false);
  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <header className="text-center pb-10 flex flex-col items-center w-11/12 lg:w-10/12 m-auto py-6 ">
        <h1 className="text-3xl font-medium">SimTracker</h1>
        <img src="/icons/logoST.png" className="w-24 mt-2 rounded-lg" alt="" />
      </header>
      <main className="w-11/12 lg:w-10/12 m-auto">
        <div className="lg:hidden text-center mb-12">
          <ButtonToggle
            onClick={toggleClick}
            props={isClicked ? "Se connecter" : "S'inscrire"}
          ></ButtonToggle>
        </div>
        <div className="lg:hidden">{isClicked ? <Signup /> : <Login />}</div>
        <div className="hidden lg:flex lg:space-x-6 justify-center mt-12 ">
          <Login />
          <Signup />
        </div>
      </main>
    </div>
  );
};

export default Log;
