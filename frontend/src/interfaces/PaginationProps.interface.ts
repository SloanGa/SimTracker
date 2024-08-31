export interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentPage: number;
  disabledPrevious: boolean;
  disabledNext: boolean;
}
