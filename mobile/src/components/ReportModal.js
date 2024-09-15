import React from "react";
import Modal from "react-modal";
import "../styles/ReportModal.css";

Modal.setAppElement("#root");

const ReportModal = ({
  isOpen,
  task,
  content,
  paymentMethods,
  selectedPaymentMethod,
  setContent,
  setSelectedPaymentMethod,
  handleSubmitReport,
  handleClose,
  isCancelAction,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    className="custom-modal"
    overlayClassName="custom-overlay"
  >
    <div className="modal-content">
      <div className="modal-header">
        <h3>Отчет для {task?.order_name}</h3>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
      </div>
      <form onSubmit={handleSubmitReport}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {!isCancelAction && (
          <div className="payment-method-select">
            <label htmlFor="payment-method" className="payment-method-label">
              Способ оплаты:
            </label>
            <select
              id="payment-method"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              required
              className="payment-method-dropdown"
            >
              <option value="" disabled>
                Выберите способ оплаты
              </option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button className="report-button" type="submit">
          Отправить отчёт
        </button>
      </form>
      <button className="cancel-btn" onClick={handleClose}>
        Отмена
      </button>
    </div>
  </Modal>
);

export default ReportModal;