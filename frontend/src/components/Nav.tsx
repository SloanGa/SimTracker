import { faBars, faSignOutAlt, faHome, faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import ButtonIcon from "./Button/ButtonIcon";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  const logOut = async () => {
    try {
      // @ts-ignore
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/logout`, {
        credentials: "include",
      });
      if (!res.ok) {
        return navigate("/error");
      }

      setIsAuthenticated(false);
      navigate("/login");
    } catch {
      navigate("/error");
    }
  };

  const location = useLocation();
  const icon = location.pathname === "/" ? faGear : faHome;
  const path = location.pathname === "/" ? "/settings" : "/";

  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <nav className="pb-4">
      <ul className="  bg-primary text-white p-8 flex justify-between items-center lg:justify-between lg:items-center">
        <li className="hidden lg:flex">
          <ButtonIcon fontSize="fa-2xl" onClick={handleNavigate} icon={icon} label="" />
        </li>

        <li className="lg:w-2/6 lg:flex lg:justify-center">
          <h1 className="font-bold text-2xl lg:text-4xl">
            <Link to="/">SimTracker</Link>
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
