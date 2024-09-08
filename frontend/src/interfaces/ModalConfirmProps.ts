export interface ModalConfirmProps {
  onDelete: () => Promise<void>;
  onCloseModals: () => void;
  errorHandling: boolean;
  errorMessageDelete: string;
  isLoading: boolean;
  text: string;
}
