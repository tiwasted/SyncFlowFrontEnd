import React from "react";
import OrderListForSchedule from "../components/OrderListForSchedule";
import Calendar from "../components/Calendar";

const OrderSchedule = ({ date, setDate, orders, setOrders }) => {
  return (
    <div className="schedule-content">
      <div className="employee-list-container">
        <OrderListForSchedule orders={orders} setOrders={setOrders} />
      </div>
      <div className="schedule-order-calendar-container">
        <h3 className="h3-schedule">Календарь</h3>
        <Calendar value={date} onDateChange={setDate} />
      </div>
    </div>
  );
};

export default OrderSchedule;