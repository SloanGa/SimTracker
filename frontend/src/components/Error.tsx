import Nav from "./Nav";

const Error = () => {
  return (
    <div>
      <Nav />
      <div className="w-full flex flex-col items-center mt-5 gap-8 pt-10">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="text-xl text-center">
          SimTracker-68KA{" "}
          <a className="font-bold text-btn text-2xl" href="/">
            Go Around !
          </a>
        </p>
      </div>
    </div>
  );
};

export default Error;
