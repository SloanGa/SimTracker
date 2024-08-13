import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Button from "../components/Button";

const Log = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <header className="text-center pb-10 flex flex-col items-center">
        <h1 className="text-3xl font-medium">SimTracker</h1>
        <img src="/icons/logoST.png" className="w-24 mt-2 rounded-lg" alt="" />
      </header>
      <main>
        <div className="lg:hidden text-center mb-12">
          <Button onClick={toggleClick} props={isClicked ? "Se connecter" : "S'inscrire"}></Button>
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
