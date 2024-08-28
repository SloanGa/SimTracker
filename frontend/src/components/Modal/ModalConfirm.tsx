import ButtonSubmit from "../Button/ButtonSubmit";
import ButtonToggle from "../Button/ButtonToggle";
import ErrorMessage from "../Messages/ErrorMessage";
import { ModalConfirmProps } from "../../interfaces/ModalConfirmProps";

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  onDeleteFlight,
  onCloseModals,
  errorHandling,
  errorMessageDelete,
}) => {
  return (
    <dialog id="confirm" className="modal ">
      <div className="modal-box">
        <p className="py-4 font-bold ">
          Etes-vous sûr de vouloir supprimer les données de ce vol ?
        </p>
        <div>
          <ButtonSubmit props={"Supprimer"} onClick={onDeleteFlight} />
        </div>
        <ButtonToggle props={"Fermer"} onClick={onCloseModals} />
        {errorHandling ? <ErrorMessage errorMessage={errorMessageDelete} /> : null}
      </div>
    </dialog>
  );
};

export default ModalConfirm;
