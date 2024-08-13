import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

const Nav = () => {
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav className="pb-4">
      <ul className="flex justify-between items-center lg:w-full lg:justify-between lg:items-center">
        <li className="hidden lg:flex">
          <a href="settings" className="text-3xl">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </a>
        </li>

        <li className="lg:w-2/6 lg:flex lg:justify-center">
          <h1 className="font-bold text-2xl">
            <a href="/">SimTracker</a>
          </h1>
        </li>

        <li className="hidden lg:flex ">
          <button className="text-3xl">
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </button>
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
