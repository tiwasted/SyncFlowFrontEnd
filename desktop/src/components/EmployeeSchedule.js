import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import ModalForDelete from "../components/ModalForDelete";
import ScheduleEditOrderModal from "../components/ScheduleEditOrderModal";
import ReassignEmployee from "../components/ReassignEmployee";
import api from "../services/TokenService";

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
      const response = await api.get(`/schedules/schedule/list_employees_by_orders/?date=${formattedDate}`);
      console.log("Employee Schedule Data:", response.data); // Логирование данных
      setEmployeeSchedule(response.data || []);
    } catch (error) {
      console.error("Ошибка при получении расписания сотрудников:", error);
      setEmployeeSchedule([]);
    }
  };

  const fetchEmployeeOrders = async (employeeId, selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
      const response = await api.get(`/schedules/schedule/list_orders_for_employee/?employee_id=${employeeId}&date=${formattedDate}`);
      setEmployeeOrders(response.data || []);
    } catch (error) {
      console.error("Ошибка при получении заказов сотрудника:", error);
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
      setEmployeeOrders((prevOrders) => prevOrders.filter(order => order.id !== orderToDelete));
    } catch (error) {
      console.error("Ошибка при удалении заказа:", error);
    }
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const cancelDeleteOrder = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const handleSaveOrder = async (updatedOrder) => {
    try {
      const response = await api.put(`/orders/b2c-orders/${updatedOrder.id}/`, updatedOrder);
      setEmployeeOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === updatedOrder.id ? response.data : order))
      );
    } catch (error) {
      console.error("Ошибка при обновлении заказа:", error);
    }
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
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
    setShowReassignModal(false);
    setOrderToReassign(null);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchEmployeeSchedule(newDate);
  };

  return (
    <div className="employee-schedule-content">
      <div className="employee-schedule-board">
        <h3>Расписание на {date.toLocaleDateString()}</h3>
        <ul>
          {employeeSchedule.map((schedule, index) => (
            <li key={index}>
              <span>{schedule.order_time}</span>
              <span>
                {schedule.employees.map((employee, empIndex) => (
                  <button
                    key={empIndex}
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    {employee.first_name} {employee.last_name}
                  </button>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="employee-orders-board">
        {selectedEmployee && (
          <div>
            <h3>Заказы сотрудника: {selectedEmployeeName}</h3>
            <ul>
              {employeeOrders.map((order) => (
                <li key={order.id}>
                  <span>{order.order_time}</span>
                  <span>{order.order_name}</span>
                  <span>{order.address}</span>
                  <span>{order.price}</span>
                  <button onClick={() => handleEditOrder(order)}>Редактировать</button>
                  <button onClick={() => handleDeleteOrder(order.id)}>Удалить</button>
                  <button onClick={() => handleReassignOrder(order)}>Переназначить сотрудника</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="schedule-employee-calendar-container">
        <h3 className="h3-schedule">Календарь</h3>
        <Calendar value={date} onDateChange={handleDateChange} />
      </div>

      {editingOrder && (
        <ScheduleEditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleSaveOrder}
        />
      )}

      <ModalForDelete
        show={showDeleteModal}
        onClose={cancelDeleteOrder}
        onConfirm={confirmDeleteOrder}
      >
        Вы уверены, что хотите удалить этот заказ?
      </ModalForDelete>

      {showReassignModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ReassignEmployee
              orderId={orderToReassign.id}
              onEmployeeAssigned={handleEmployeeAssigned}
              show={showReassignModal}
              onClose={closeReassignModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSchedule;