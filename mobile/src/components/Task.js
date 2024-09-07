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

  const getOrderUrl = (action) => {
    const baseUrl =
      task.order_type === "B2B" ? "/orders/b2b-orders" : "/orders/b2c-orders";
    return `${baseUrl}/${task.id}/${action}/`;
  };

  const handleAction = (action) => {
    setActionType(action);
    setIsReportModalOpen(true);
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

    if (actionType === "complete") {
      await handleCompleteOrder(formData);
    } else if (actionType === "cancel") {
      await handleCancelOrder(formData);
    }

    setContent("");
    setIsReportModalOpen(false);
    fetchTasks();
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
        handleSubmitReport={handleSubmitReport}
        handleClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default Task;
