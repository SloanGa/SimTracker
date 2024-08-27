import Nav from "../components/Nav";
import Profil from "../components/Profil";
import AboutProfil from "../components/AboutProfil";

const Settings = () => {
  return (
    <div>
      <Nav />
      <div className="flex flex-col gap-2 p-4 rounded-lg shadow-custom bg-white w-11/12 m-auto lg:flex-row">
        <Profil />
        <AboutProfil />
      </div>
    </div>
  );
};

export default Settings;
