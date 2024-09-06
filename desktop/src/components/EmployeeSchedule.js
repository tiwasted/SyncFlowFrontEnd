import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import Calendar from "../components/Calendar";
import ModalForDelete from "../components/ModalForDelete";
import ScheduleEditOrderModal from "../components/ScheduleEditOrderModal";
import ReassignEmployee from "../components/ReassignEmployee";
import "../styles/EmployeeSchedule.css";
import PencilIcon from "../Icons/Pencil.svg";
import BasketIcon from "../Icons/Basket.svg";
import ReassignEmployeeIcon from "../Icons/ReassignEmployee.png";

const EmployeeSchedule = ({ date, setDate }) => {
  const [employeeOrders, setEmployeeOrders] = useState([]);
  const [employeeSchedule, setEmployeeSchedule] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [orderToReassign, setOrderToReassign] = useState(null);

  const fetchEmployeeSchedule = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
      const response = await api.get(
        `/schedules/schedule/list_employees_by_orders/?date=${formattedDate}`
      );
      setEmployeeSchedule(response.data || []);
    } catch (error) {
      setEmployeeSchedule([]);
    }
  };

  const fetchEmployeeOrders = async (employeeId, selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
      const response = await api.get(
        `/schedules/schedule/list_orders_for_employee/?employee_id=${employeeId}&date=${formattedDate}`
      );
      setEmployeeOrders(response.data || []);
    } catch (error) {
      setEmployeeOrders([]);
    }
  };

  useEffect(() => {
    fetchEmployeeSchedule(date);
  }, [date]);

  useEffect(() => {
    setSelectedEmployee(null);
    setSelectedEmployeeName("");
    setEmployeeOrders([]);
  }, [date]);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee.id);
    setSelectedEmployeeName(`${employee.first_name} ${employee.last_name}`);
    fetchEmployeeOrders(employee.id, date);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
  };

  const handleDeleteOrder = (orderId) => {
    setShowDeleteModal(true);
    setOrderToDelete(orderId);
  };

  const confirmDeleteOrder = async () => {
    try {
      await api.delete(`/orders/b2c-orders/${orderToDelete}/`);
      setEmployeeOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderToDelete)
      );
      fetchEmployeeSchedule(date);
      if (selectedEmployee) {
        fetchEmployeeOrders(selectedEmployee, date);
      }
    } catch (error) {}
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const cancelDeleteOrder = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const handleSaveOrder = async (updatedOrder) => {
    try {
      const response = await api.put(
        `/orders/b2c-orders/${updatedOrder.id}/`,
        updatedOrder
      );
      setEmployeeOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? response.data : order
        )
      );
      fetchEmployeeSchedule(date);
      if (selectedEmployee) {
        fetchEmployeeOrders(selectedEmployee, date);
      }
    } catch (error) {}
    setEditingOrder(null);
  };

  const handleReassignOrder = (order) => {
    setOrderToReassign(order);
    setShowReassignModal(true);
  };

  const closeReassignModal = () => {
    setShowReassignModal(false);
    setOrderToReassign(null);
  };

  const handleEmployeeAssigned = (updatedOrder) => {
    setEmployeeOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    fetchEmployeeSchedule(date);
    if (selectedEmployee) {
      fetchEmployeeOrders(selectedEmployee, date);
    }
    setShowReassignModal(false);
    setOrderToReassign(null);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchEmployeeSchedule(newDate);
  };

  const formatTime = (timeString) => {
    if (!timeString) {
      return "Время не назначено";
    }

    const date = new Date(`1970-01-01T${timeString}`);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const sortedEmployeeSchedule = [...employeeSchedule].sort((a, b) => {
    if (!a.order_time) return -1;
    if (!b.order_time) return 1;
    return 0;
  });

  return (
    <div className="employee-schedule-content">
      <div className="employee-schedule-sections">
        <div className="employee-schedule-section employee-schedule-board">
          <h3 className="employee-schedule-title-schedule-of-employees">
            Расписание на {date.toLocaleDateString()}
          </h3>
          <ul className="employee-schedule-ul-schedule-of-employees">
            {sortedEmployeeSchedule.map((schedule, index) => (
              <li
                className="employee-schedule-li-schedule-of-employees"
                key={index}
              >
                <span className="employee-schedule-span-order-time-schedule-of-employees">
                  {formatTime(schedule.order_time)}
                </span>
                <span className="employee-schedule-span-employees-schedule-of-employees">
                  {schedule.employees.length > 0 ? (
                    schedule.employees.map((employee, empIndex) => (
                      <button
                        className="employee-schedule-button-employee-schedule-of-employees"
                        key={empIndex}
                        onClick={() => handleEmployeeClick(employee)}
                      >
                        {employee.first_name} {employee.last_name}
                      </button>
                    ))
                  ) : (
                    <button
                      className="employee-schedule-button-reassign"
                      onClick={() => handleReassignOrder(schedule)}
                    >
                      Переназначить сотрудника
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="employee-schedule-section employee-schedule-orders-board">
          {selectedEmployee ? (
            <div>
              {employeeOrders.length > 0 ? (
                <>
                  <h3 className="employee-schedule-title-orders">
                    Заказы сотрудника: {selectedEmployeeName}
                  </h3>
                  <div className="order-container-dashboard">
                    {employeeOrders.map((order) => (
                      <div className="order-item-dashboard" key={order.id}>
                        <div className="order-item-details-container">
                          <div className="order-item-info">
                            <p className="order-item-name">
                              <b>Наименование:</b> {order.order_name}
                            </p>
                            <div className="order-item-details">
                              <div className="">
                                <div className="order-item-time">
                                  {formatTime(order.order_time)}
                                </div>
                              </div>
                              <div>
                                <b>Дата:</b> {formatDate(order.order_date)}
                              </div>
                              <div>
                                <b>Адрес:</b> {order.address}
                              </div>
                              <div>
                                <b>Цена:</b> {order.price}
                              </div>
                            </div>
                          </div>
                          <div className="order-item-actions">
                            <button
                              className="order-list-btn-dashboard"
                              onClick={() => handleEditOrder(order)}
                            >
                              <img
                                src={PencilIcon}
                                alt="Редактировать"
                                className="icon"
                              />
                            </button>
                            <button
                              className="order-delete-btn-dashboard"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              <img
                                src={BasketIcon}
                                alt="Удалить"
                                className="icon"
                              />
                            </button>
                            <button
                              className="order-assign-btn-dashboard"
                              onClick={() => handleReassignOrder(order)}
                            >
                              <img
                                src={ReassignEmployeeIcon}
                                alt="Переназначить сотрудника"
                                className="icon"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h3 className="employee-schedule-title-orders">
                  Выберите сотрудника
                </h3>
              )}
            </div>
          ) : (
            <h3 className="employee-schedule-title-orders">
              Выберите сотрудника
            </h3>
          )}
        </div>

        <div className="employee-schedule-section employee-schedule-calendar-container">
          <h3 className="employee-schedule-title-calendar">Календарь</h3>
          <Calendar value={date} onDateChange={handleDateChange} />
        </div>
      </div>

      {editingOrder && (
        <ScheduleEditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleSaveOrder}
        />
      )}

      {showDeleteModal && (
        <ModalForDelete
          show={showDeleteModal}
          onClose={cancelDeleteOrder}
          onConfirm={confirmDeleteOrder}
        >
          Вы уверены, что хотите удалить этот заказ?
        </ModalForDelete>
      )}

      {showReassignModal && (
        <ReassignEmployee
          orderId={orderToReassign.id}
          assignedEmployees={orderToReassign.employees}
          onEmployeeAssigned={handleEmployeeAssigned}
          show={showReassignModal}
          onClose={closeReassignModal}
        />
      )}
    </div>
  );
};

export default EmployeeSchedule;
