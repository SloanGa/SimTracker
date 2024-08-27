import { useData } from "../context/DataContext";

const AboutProfil = () => {
  const { userData } = useData();
  return (
    <div className="flex flex-col gap-4 px-12 py-4 rounded-lg shadow-custom bg-white w-11/12 m-auto">
      <h1>Profil de {userData.firstname}</h1>
      <h1>email : {userData.email}</h1>
    </div>
  );
};

export default AboutProfil;
