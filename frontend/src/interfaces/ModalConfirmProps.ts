export interface ModalConfirmProps {
  onDelete: () => Promise<void>;
  onCloseModals: () => void;
  errorHandling: boolean;
  errorMessageDelete: string;
  text: string;
}
