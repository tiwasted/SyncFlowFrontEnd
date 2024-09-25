import React, { useState, useEffect } from "react";
import "../styles/PaymentMethodsModal.css";

const PaymentMethodsModal = ({
  paymentMethods,
  selectedPaymentMethods: initialSelectedPaymentMethods,
  handleSavePaymentMethods,
  handleClosePaymentMethodsModal,
}) => {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

  useEffect(() => {
    setSelectedPaymentMethods(initialSelectedPaymentMethods);
  }, [initialSelectedPaymentMethods]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const selectedMethod = paymentMethods.find((method) => method.id === Number(value));
    
    setSelectedPaymentMethods((prevMethods) =>
      checked
        ? [...prevMethods, selectedMethod]
        : prevMethods.filter((method) => method.id !== Number(value))
    );
  };

  const handleSave = () => {
    handleSavePaymentMethods(selectedPaymentMethods);
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
                  checked={selectedPaymentMethods.some((selectedMethod) => selectedMethod.id === method.id)}
                  onChange={handleCheckboxChange}
                  className="payment-method-modal-checkbox"
                />
                {method.name}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSave}
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