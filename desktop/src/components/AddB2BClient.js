import React, { useState } from "react";
import axios from "axios";

const AddB2BClient = ({ onB2BClientAdded }) => {
  const [newB2BClient, setNewB2BClient] = useState({ name: "", email: "" });

  const handleAddB2BClient = async () => {
    try {
      const response = await axios.post("/api/b2bclients/", newB2BClient);
      onB2BClientAdded(response.data);
      setNewB2BClient({ name: "", email: "" });
    } catch (error) {
      console.error("Ошибка при добавлении клиента:", error);
    }
  };

  return (
    <div>
      <h2>Добавить клиента B2B</h2>
      <input
        type="text"
        placeholder="Имя клиента B2B"
        value={newB2BClient.name}
        onChange={(e) =>
          setNewB2BClient({ ...newB2BClient, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email клиента B2B"
        value={newB2BClient.email}
        onChange={(e) =>
          setNewB2BClient({ ...newB2BClient, email: e.target.value })
        }
      />
      <button onClick={handleAddB2BClient}>Добавить клиента B2B</button>
    </div>
  );
};

export default AddB2BClient;
