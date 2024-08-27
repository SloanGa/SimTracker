import { PaginationProps } from "../interfaces/PaginationProps.interface";

const Pagination: React.FC<PaginationProps> = ({
  onPrevious,
  onNext,
  currentPage,
  disabledPrevious,
  disabledNext,
}) => {
  return (
    <div className="join w-max mx-auto pb-6">
      <button
        className="join-item btn bg-primary text-white"
        onClick={onPrevious}
        disabled={disabledPrevious}
      >
        «
      </button>
      <button className="join-item btn bg-primary text-white">{currentPage}</button>
      <button
        className="join-item btn bg-primary text-white"
        onClick={onNext}
        disabled={disabledNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
