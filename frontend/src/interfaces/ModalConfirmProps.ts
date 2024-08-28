export interface ModalConfirmProps {
  onDeleteFlight: () => Promise<void>;
  onCloseModals: () => void;
  errorHandling: boolean;
  errorMessageDelete: string;
}
