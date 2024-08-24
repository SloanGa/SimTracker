import { faBars, faGear, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import ButtonIcon from "./Button/ButtonIcon";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/settings");
  };

  const { setIsAuthenticated } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  const logOut = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        return console.log("error");
      }
      setIsAuthenticated(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="pb-4">
      <ul className="  bg-primary text-white p-8 flex justify-between items-center lg:justify-between lg:items-center">
        <li className="hidden lg:flex">
          <ButtonIcon fontSize="fa-2xl" onClick={handleNavigate} icon={faGear} label="" />
        </li>

        <li className="lg:w-2/6 lg:flex lg:justify-center">
          <h1 className="font-bold text-2xl lg:text-4xl">
            <a href="/">SimTracker</a>
          </h1>
        </li>

        <li className="hidden lg:flex ">
          <ButtonIcon fontSize="fa-2xl" onClick={logOut} icon={faSignOutAlt} label="" />
        </li>

        <li className="lg:hidden">
          <ButtonIcon fontSize="fa-2xl" onClick={toggleClick} icon={faBars} label="" />
        </li>
        {isClicked ? (
          <BurgerMenu onLogOut={logOut} onClose={toggleClick} onNavigate={handleNavigate} />
        ) : null}
      </ul>
    </nav>
  );
};

export default Nav;
