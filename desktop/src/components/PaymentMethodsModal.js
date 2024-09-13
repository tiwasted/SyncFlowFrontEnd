import React from "react";
import "../styles/PaymentMethodsModal.css";

const PaymentMethodsModal = ({
  paymentMethods,
  selectedPaymentMethods,
  setSelectedPaymentMethods,
  handleSavePaymentMethods,
  handleClosePaymentMethodsModal,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPaymentMethods((prevMethods) =>
      checked
        ? [...prevMethods, Number(value)]
        : prevMethods.filter((methodId) => methodId !== Number(value))
    );
  };

  return (
    <div className="payment-method-modal">
      <div className="payment-method-modal-content">
        <h2 className="payment-method-modal-title">Выберите способы оплаты</h2>
        <ul className="payment-method-modal-list">
          {paymentMethods.map((method) => (
            <li key={method.id} className="payment-method-modal-list-item">
              <label className="payment-method-modal-label">
                <input
                  type="checkbox"
                  value={method.id}
                  checked={selectedPaymentMethods.includes(method.id)}
                  onChange={handleCheckboxChange}
                  className="payment-method-modal-checkbox"
                />
                {method.name}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={() => handleSavePaymentMethods(selectedPaymentMethods)}
          className="payment-method-modal-save-button"
        >
          Сохранить
        </button>
        <button
          onClick={handleClosePaymentMethodsModal}
          className="payment-method-modal-close-button"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodsModal;