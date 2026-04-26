export interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}
