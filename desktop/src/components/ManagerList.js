import React, { useState } from "react";
import ModalForDelete from "./ModalForDelete";
import ManagerEdit from "./ManagerEdit"; // Assuming you have a ManagerEdit component
import api from "../services/TokenService";

const ManagerList = ({ managers, setManagers, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [managerToEdit, setManagerToEdit] = useState(null);

  const handleDelete = async () => {
    if (managerToDelete === null) return;

    onDelete(managerToDelete); // Call the delete function from the parent component
    setShowModal(false); // Close the modal after deletion
  };

  const handleDeleteClick = (id) => {
    setManagerToDelete(id);
    setShowModal(true);
  };

  const handleEditClick = (manager) => {
    setManagerToEdit(manager);
  };

  const handleCancelEdit = () => {
    setManagerToEdit(null);
  };

  const handleSaveEdit = async (updatedManager) => {
    try {
      const response = await api.put(
        `/employers/manager/edit/${updatedManager.id}/`,
        updatedManager
      );
      setManagers(
        managers.map((man) =>
          man.id === updatedManager.id ? response.data : man
        )
      );
      setManagerToEdit(null);
    } catch (error) {
      console.error("Error saving manager data:", error);
    }
  };

  return (
    <div className="manager-list-container">
      {managerToEdit ? (
        <ManagerEdit
          manager={managerToEdit}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <h1 className="manager-list-title">Список менеджеров</h1>
          <div className="manager-grid-header">
            <div className="manager-grid-header-item">Фамилия Имя</div>
            <div className="manager-grid-header-item">Телефон</div>
            <div className="manager-grid-header-item">Действия</div>
          </div>
          {managers.map((manager) => (
            <div className="manager-grid" key={manager.id}>
              <div className="manager-name">
                <div className="manager-last-name">{manager.last_name}</div>
                <div className="manager-first-name">{manager.first_name}</div>
              </div>
              <div className="manager-phone">{manager.phone}</div>
              <div className="manager-actions">
                <button
                  className="manager-edit-btn"
                  onClick={() => handleEditClick(manager)}
                >
                  Редактировать
                </button>
                <button
                  className="manager-delete-btn"
                  onClick={() => handleDeleteClick(manager.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
          <ModalForDelete
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
          >
            Вы точно хотите удалить этого менеджера?
          </ModalForDelete>
        </>
      )}
    </div>
  );
};

export default ManagerList;
