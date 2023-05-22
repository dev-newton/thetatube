import "react-responsive-modal/styles.css";
import { Modal as Modall } from "react-responsive-modal";
import "./Modal.css";

const Modal = ({ open, onCloseModal, children, modalTitle }) => {
  return (
    <Modall
      open={open}
      onClose={onCloseModal}
      closeOnOverlayClick={true}
      showCloseIcon={true}
      classNames={{
        overlay: "customOverlay",
        modal: "customModalForm",
        closeIcon: "customClose",
        root: "root",
      }}
    >
      <div className="modal_wrapper">
        <div className="modal_form_card_auth">
          <p className="modal-title">{modalTitle}</p>
          {children}
        </div>
      </div>
    </Modall>
  );
};

export default Modal;
