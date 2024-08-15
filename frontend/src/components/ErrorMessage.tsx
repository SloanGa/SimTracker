interface ErrorMessageProps {
  errorMessage: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return (
    <div>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
