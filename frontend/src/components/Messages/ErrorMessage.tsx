const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) return null;
  return (
    <div>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
