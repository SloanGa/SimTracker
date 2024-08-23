interface SucessMessageProps {
  sucessMessage: string | null;
}

const SucessMessage: React.FC<SucessMessageProps> = ({ sucessMessage }) => {
  if (!sucessMessage) return null;
  return (
    <div>
      <p className="text-green-600">{sucessMessage}</p>
    </div>
  );
};

export default SucessMessage;
