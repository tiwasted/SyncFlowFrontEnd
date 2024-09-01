import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import ModalForDelete from "../components/ModalForDelete";
import ScheduleEditOrderModal from "../components/ScheduleEditOrderModal";
import ReassignEmployee from "../components/ReassignEmployee";

const mockEmployeeSchedule = [
  {
    date: "2024-08-28",
    schedule: [
      {
        time: "09:00",
        employees: [
          { id: 1, name: "Иван Иванов" },
          { id: 2, name: "Петр Петров" }
        ]
      },
      {
        time: "10:00",
        employees: [
          { id: 3, name: "Сергей Сергеев" },
          { id: 4, name: "Алексей Алексеев" }
        ]
      },
      {
        time: "11:00",
        employees: [
          { id: 1, name: "Иван Иванов" },
          { id: 5, name: "Мария Мариева" }
        ]
      }
    ]
  },
  {
    date: "2024-08-29",
    schedule: [
      {
        time: "09:00",
        employees: [
          { id: 2, name: "Петр Петров" },
          { id: 6, name: "Анна Аннова" }
        ]
      },
      {
        time: "10:00",
        employees: [
          { id: 3, name: "Сергей Сергеев" },
          { id: 7, name: "Дмитрий Дмитриев" }
        ]
      },
      {
        time: "11:00",
        employees: [
          { id: 1, name: "Иван Иванов" },
          { id: 8, name: "Елена Еленова" }
        ]
      }
    ]
  },
  {
    date: "2024-09-10",
    schedule: [
      {
        time: "09:00",
        employees: [
          { id: 1, name: "Иван Иванов" },
          { id: 2, name: "Петр Петров" }
        ]
      },
      {
        time: "10:00",
        employees: [
          { id: 3, name: "Сергей Сергеев" },
          { id: 4, name: "Алексей Алексеев" }
        ]
      },
      {
        time: "11:00",
        employees: [
          { id: 1, name: "Иван Иванов" },
          { id: 5, name: "Мария Мариева" }
        ]
      }
    ]
  }
];

const mockEmployeeOrders = [
  { id: 1, employeeId: 1, time: "09:30", name: "Заказ 1", order_date: "2024-08-28", order_time: "09:30", name_client: "Клиент 1", phone_number_client: "1234567890", address: "Адрес 1", description: "Описание заказа 1", price: 100 },
  { id: 2, employeeId: 1, time: "10:30", name: "Заказ 2", order_date: "2024-08-28", order_time: "10:30", name_client: "Клиент 2", phone_number_client: "0987654321", address: "Адрес 2", description: "Описание заказа 2", price: 200 },
  { id: 3, employeeId: 2, time: "09:45", name: "Заказ 3", order_date: "2024-08-28", order_time: "09:45", name_client: "Клиент 3", phone_number_client: "1122334455", address: "Адрес 3", description: "Описание заказа 3", price: 150 },
  { id: 4, employeeId: 2, time: "11:00", name: "Заказ 4", order_date: "2024-08-28", order_time: "11:00", name_client: "Клиент 4", phone_number_client: "5566778899", address: "Адрес 4", description: "Описание заказа 4", price: 250 },
  { id: 5, employeeId: 3, time: "10:15", name: "Заказ 5", order_date: "2024-08-29", order_time: "10:15", name_client: "Клиент 5", phone_number_client: "6677889900", address: "Адрес 5", description: "Описание заказа 5", price: 300 },
  { id: 6, employeeId: 3, time: "11:30", name: "Заказ 6", order_date: "2024-08-29", order_time: "11:30", name_client: "Клиент 6", phone_number_client: "7788990011", address: "Адрес 6", description: "Описание заказа 6", price: 350 },
  { id: 7, employeeId: 4, time: "09:30", name: "Заказ 7", order_date: "2024-08-29", order_time: "09:30", name_client: "Клиент 7", phone_number_client: "8899001122", address: "Адрес 7", description: "Описание заказа 7", price: 400 },
  { id: 8, employeeId: 4, time: "10:45", name: "Заказ 8", order_date: "2024-08-29", order_time: "10:45", name_client: "Клиент 8", phone_number_client: "9900112233", address: "Адрес 8", description: "Описание заказа 8", price: 450 },
  { id: 9, employeeId: 5, time: "11:15", name: "Заказ 9", order_date: "2024-09-10", order_time: "11:15", name_client: "Клиент 9", phone_number_client: "0011223344", address: "Адрес 9", description: "Описание заказа 9", price: 500 },
  { id: 10, employeeId: 5, time: "12:00", name: "Заказ 10", order_date: "2024-09-10", order_time: "12:00", name_client: "Клиент 10", phone_number_client: "1122334455", address: "Адрес 10", description: "Описание заказа 10", price: 550 },
  { id: 11, employeeId: 6, time: "09:30", name: "Заказ 11", order_date: "2024-09-10", order_time: "09:30", name_client: "Клиент 11", phone_number_client: "2233445566", address: "Адрес 11", description: "Описание заказа 11", price: 600 },
  { id: 12, employeeId: 6, time: "10:30", name: "Заказ 12", order_date: "2024-09-10", order_time: "10:30", name_client: "Клиент 12", phone_number_client: "3344556677", address: "Адрес 12", description: "Описание заказа 12", price: 650 },
  { id: 13, employeeId: 7, time: "11:00", name: "Заказ 13", order_date: "2024-09-10", order_time: "11:00", name_client: "Клиент 13", phone_number_client: "4455667788", address: "Адрес 13", description: "Описание заказа 13", price: 700 },
  { id: 14, employeeId: 7, time: "12:00", name: "Заказ 14", order_date: "2024-09-10", order_time: "12:00", name_client: "Клиент 14", phone_number_client: "5566778899", address: "Адрес 14", description: "Описание заказа 14", price: 750 },
  { id: 15, employeeId: 8, time: "09:30", name: "Заказ 15", order_date: "2024-09-10", order_time: "09:30", name_client: "Клиент 15", phone_number_client: "6677889900", address: "Адрес 15", description: "Описание заказа 15", price: 800 },
  { id: 16, employeeId: 8, time: "10:30", name: "Заказ 16", order_date: "2024-09-10", order_time: "10:30", name_client: "Клиент 16", phone_number_client: "7788990011", address: "Адрес 16", description: "Описание заказа 16", price: 850 }
];

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

  const fetchEmployeeSchedule = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const schedule = mockEmployeeSchedule.find(s => s.date === formattedDate);
    setEmployeeSchedule(schedule ? schedule.schedule : []);
  };

  useEffect(() => {
    fetchEmployeeSchedule(date);
  }, [date]);

  useEffect(() => {
    setSelectedEmployee(null);
    setSelectedEmployeeName("");
    setEmployeeOrders([]);
  }, [date]);

  const fetchEmployeeOrders = (employeeId) => {
    const orders = mockEmployeeOrders.filter(order => order.employeeId === employeeId);
    setEmployeeOrders(orders);
  };

  const handleEmployeeClick = (employeeId, employeeName) => {
    setSelectedEmployee(employeeId);
    setSelectedEmployeeName(employeeName);
    fetchEmployeeOrders(employeeId);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
  };

  const handleDeleteOrder = (orderId) => {
    setShowDeleteModal(true);
    setOrderToDelete(orderId);
  };

  const confirmDeleteOrder = () => {
    setEmployeeOrders((prevOrders) => prevOrders.filter(order => order.id !== orderToDelete));
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const cancelDeleteOrder = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const handleSaveOrder = (updatedOrder) => {
    setEmployeeOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
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

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchEmployeeSchedule(newDate);
  };

  return (
    <div className="employee-schedule-content">
      <div className="employee-schedule-board">
        <h3>Расписание на {date.toLocaleDateString()}</h3>
        <ul>
          {employeeSchedule.map((schedule) => (
            <li key={schedule.time}>
              <span>{schedule.time}</span>
              <span>
                {schedule.employees.map((employee) => (
                  <button
                    key={employee.id}
                    onClick={() => handleEmployeeClick(employee.id, employee.name)}
                  >
                    {employee.name}
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
                  <span>{order.time}</span>
                  <span>{order.name}</span>
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
            <ReassignEmployee orderId={orderToReassign.id} />
            <button onClick={closeReassignModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSchedule;