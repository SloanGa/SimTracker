import ButtonSubmit from "../Button/ButtonSubmit";
import ButtonToggle from "../Button/ButtonToggle";
import ErrorMessage from "../Messages/ErrorMessage";
import { ModalConfirmProps } from "../../interfaces/ModalConfirmProps";

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  onDelete,
  onCloseModals,
  errorHandling,
  errorMessageDelete,
  isLoading,
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
        {isLoading ? (
          <div className="w-full flex justify-center mt-5">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : null}
      </div>
    </dialog>
  );
};

export default ModalConfirm;
