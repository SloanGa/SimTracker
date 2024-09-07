import Nav from "../components/Nav";

const Spinner = () => {
  return (
    <div>
      <Nav />
      <div className="w-full flex justify-center mt-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
};

export default Spinner;
