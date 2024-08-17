import ButtonSubmit from "../Button/ButtonSubmit";
import ButtonToggle from "../Button/ButtonToggle";
import ErrorMessage from "../ErrorMessage";

const ModalAddFlight = () => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form className="dialog flex flex-col gap-4 px-12 py-4 w-full ">
          <div className="flex flex-wrap gap-10 justify-center">
            <div className="flex flex-col gap-1 w-1/2 lg:w-1/4">
              <label htmlFor="date" className="self-start font-bold">
                Date
              </label>
              <input
                className="input input-bordered flex items-center gap-2"
                type="date"
                placeholder="17/08/2024"
                name="date"
                id="date"
                // value={formData.firstname}
                // onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/4">
              <label htmlFor="flight_number" className="self-start font-bold">
                Numéro de vol
              </label>
              <input
                className="input input-bordered flex items-center gap-2"
                type="text"
                placeholder="AF68KA"
                name="flight_number"
                id="flight_number"
                // value={formData.firstname}
                // onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1 w-1/4">
              <label htmlFor="departure" className="self-start font-bold">
                Départ
              </label>
              <input
                className="input input-bordered flex items-center gap-2"
                type="text"
                placeholder="LFMN"
                name="departure"
                id="departure"
                // value={formData.firstname}
                // onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/4">
              <label htmlFor="arrival" className="self-start font-bold">
                Arrivée
              </label>
              <input
                className="input input-bordered flex items-center gap-2"
                type="text"
                placeholder="LFPO"
                name="arrival"
                id="arrival"
                // value={formData.firstname}
                // onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/4">
              <label htmlFor="flight_time" className="self-start font-bold">
                Temps de vol (en minutes)
              </label>
              <input
                className="input input-bordered flex items-center gap-2"
                type="text"
                placeholder="75"
                name="flight_time"
                id="flight_time"
                // value={formData.firstname}
                // onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/4">
              <label htmlFor="aircraft" className="self-start font-bold">
                Avion
              </label>
              <input
                className="input input-bordered flex items-center gap-2"
                type="text"
                placeholder="A320 - F-GKXZ"
                name="aircraft"
                id="aircraft"
                // value={formData.firstname}
                // onChange={handleChange}
              />
            </div>
          </div>

          {/* <ErrorMessage errorMessage={errorMessageSign} /> */}
          <ButtonSubmit props="Ajouter un vol" />
          <ButtonToggle props="Importer avec SimBrief" />
        </form>
        <form method="dialog">
          {/* if there is a button, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalAddFlight;
