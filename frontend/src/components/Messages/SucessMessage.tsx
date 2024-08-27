const SucessMessage = ({ sucessMessage }: { sucessMessage: string }) => {
  if (!sucessMessage) return null;
  return (
    <div>
      <p className="text-green-600">{sucessMessage}</p>
    </div>
  );
};

export default SucessMessage;
