import ButtonSubmit from "../Button/ButtonSubmit";
import ButtonToggle from "../Button/ButtonToggle";
import ErrorMessage from "../Messages/ErrorMessage";
import { ModalConfirmProps } from "../../interfaces/ModalConfirmProps";

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  onDelete,
  onCloseModals,
  errorHandling,
  errorMessageDelete,
  text,
}) => {
  return (
    <dialog id="confirm" className="modal ">
      <div className="modal-box flex flex-col items-center">
        <p className="py-4 font-bold text-center ">{text}</p>
        <div>
          <ButtonSubmit props={"Supprimer"} onClick={onDelete} />
        </div>
        <ButtonToggle props={"Fermer"} onClick={onCloseModals} />
        {errorHandling ? <ErrorMessage errorMessage={errorMessageDelete} /> : null}
      </div>
    </dialog>
  );
};

export default ModalConfirm;
