import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import LogOut from "./Logout";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const { setIsAuthenticated } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  const logOut = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return console.log("error");
      }
      setIsAuthenticated(false); //navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="pb-4">
      <ul className="  bg-primary text-white p-8 flex justify-between items-center lg:w-screen lg:justify-between lg:items-center">
        <li className="hidden lg:flex hover:text-btn ease-out duration-300">
          <a href="settings" className="text-3xl">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </a>
        </li>

        <li className="lg:w-2/6 lg:flex lg:justify-center">
          <h1 className="font-bold text-2xl lg:text-4xl">
            <a href="/">SimTracker</a>
          </h1>
        </li>

        <li className="hidden lg:flex ">
          <LogOut onClick={logOut} />
        </li>

        <li className="lg:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer text-3xl"
            onClick={toggleClick}
          />
        </li>
        {isClicked ? <BurgerMenu onClose={toggleClick} /> : null}
      </ul>
    </nav>
  );
};

export default Nav;
