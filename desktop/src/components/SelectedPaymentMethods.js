import React from "react";

const SelectedPaymentMethods = ({ selectedPaymentMethods }) => (
  <div className="selected-payment-methods">
    <h2 className="selected-payment-methods-title">
      Выбранные способы оплаты:
    </h2>
    <ul className="selected-payment-methods-list">
      {selectedPaymentMethods.map((method) => (
        <li key={method.id} className="selected-payment-methods-item">
          {method.name}
        </li>
      ))}
    </ul>
  </div>
);

export default SelectedPaymentMethods;
