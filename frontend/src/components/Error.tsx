import Nav from "./Nav";

const Error = () => {
  return (
    <div>
      <Nav />
      <div className="w-full flex flex-col items-center mt-5">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default Error;
