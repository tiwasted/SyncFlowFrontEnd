import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import TaskActions from "./TaskActions";
import ReportModal from "./ReportModal";
import api from "../services/tokenService";
import "../styles/Task.css";

const Task = ({ task, onUpdate, fetchTasks }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [report, setContent] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isCancelAction, setIsCancelAction] = useState(false);

  const getOrderUrl = (action) => {
    const baseUrl =
      task.order_type === "B2B" ? "/orders/b2b-orders" : "/orders/b2c-orders";
    return `${baseUrl}/${task.id}/${action}/`;
  };

  const handleAction = (action) => {
    setActionType(action);
    setIsReportModalOpen(true);
    setIsCancelAction(action === "cancel");
    if (action !== "cancel") {
      fetchPaymentMethods();
    }
  };

  const handleCompleteOrder = async (formData) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await api.post(getOrderUrl("complete_order"), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onUpdate(response.data);
      fetchTasks();
    } catch (error) {
      // console.error('Ошибка при завершении заказа:', error);
    }
  };

  const handleCancelOrder = async (formData) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await api.post(getOrderUrl("cancel_order"), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onUpdate(response.data);
    } catch (error) {
      // console.error('Ошибка при отмене заказа:', error);
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("report", report);
    if (!isCancelAction) {
      formData.append("payment_method", selectedPaymentMethod);
    }

    if (actionType === "complete") {
      await handleCompleteOrder(formData);
    } else if (actionType === "cancel") {
      await handleCancelOrder(formData);
    }

    setContent("");
    setSelectedPaymentMethod("");
    setIsReportModalOpen(false);
    fetchTasks();
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get("/employers/available-payment-methods/");
      setPaymentMethods(response.data.payment_methods || []);
    } catch (error) {
      // console.error('Ошибка при загрузке способов оплаты:', error);
    }
  };

  return (
    <div className="task">
      <TaskDetails task={task} />
      <TaskActions
        task={task}
        onAction={handleAction}
        fetchTasks={fetchTasks}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        task={task}
        content={report}
        setContent={setContent}
        paymentMethods={paymentMethods}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        handleSubmitReport={handleSubmitReport}
        handleClose={() => setIsReportModalOpen(false)}
        isCancelAction={isCancelAction}
      />
    </div>
  );
};

export default Task;