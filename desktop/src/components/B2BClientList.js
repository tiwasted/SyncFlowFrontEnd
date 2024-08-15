import React from "react";
import axios from "axios";

const B2BClientList = ({ b2bClients, onDeleteB2BClient }) => {
  const handleDeleteB2BClient = async (id) => {
    try {
      await axios.delete(`/api/b2bclients/${id}/`);
      onDeleteB2BClient(id);
    } catch (error) {
      // console.error("Ошибка при удалении клиента B2B:", error);
    }
  };

  return (
    <div>
      <h2>Список клиентов B2B</h2>
      <ul>
        {b2bClients.map((b2bClient) => (
          <li key={b2bClient.id}>
            {b2bClient.name} ({b2bClient.email})
            <button onClick={() => handleDeleteB2BClient(b2bClient.id)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default B2BClientList;
