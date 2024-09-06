import React from "react";
import "../styles/ModalForDelete.css";

const ModalForDelete = ({ show, onClose, onConfirm, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content-form">
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={onConfirm} className="modal-confirm-btn">
            Да
          </button>
          <button onClick={onClose} className="modal-cancel-btn">
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForDelete;
