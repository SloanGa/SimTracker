import { useData } from "../context/DataContext";
import ButtonSubmit from "./Button/ButtonSubmit";
import ButtonToggle from "./Button/ButtonToggle";

const Profil = () => {
  const { userData } = useData();

  return (
    <div className="flex flex-col items-center gap-4 px-12 py-4 rounded-lg shadow-custom bg-white w-11/12 m-auto">
      <h1 className="font-bold text-lg">Profil</h1>
      {userData.picture_url ? (
        <img
          className="w-1/6 rounded-full p-4"
          src={`/upload/${userData.picture_url}`}
          alt="avatar"
        />
      ) : (
        <img
          className="w-1/6 rounded-full bg-slate-700  p-4"
          src="/upload/avatar.svg"
          alt="avatar"
        />
      )}

      <p>{userData.firstname}</p>
      <h1>{userData.lastname}</h1>
      <ButtonToggle props={"Modifier le profil"} />
      <ButtonSubmit props={"Supprimer le compte"} />
    </div>
  );
};

export default Profil;
