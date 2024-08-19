interface sucessMessageProps {
  sucessMessage: string | null;
}

const sucessMessage: React.FC<sucessMessageProps> = ({ sucessMessage }) => {
  if (!sucessMessage) return null;
  return (
    <div>
      <p className="text-green-600">{sucessMessage}</p>
    </div>
  );
};

export default sucessMessage;
