import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/tokenService';

const ClientList = ({ clients, setClients }) => {
    const handleDelete = async (id) => {
        try {
            await api.delete(`http://localhost:8000/clients/b2b-clients/${id}/`);
            setClients(clients.filter(client => client.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении клиента", error);
        }
    };

    return (
        <div>
            {clients.map((client) => (
                <div key={client.id} className="client-item">
                    <h4>{client.name}</h4>
                    <p>{`Email: ${client.email}`}</p>
                    <p>{`Телефон: ${client.phone_number}`}</p>
                    <p>{`Компания: ${client.company}`}</p>
                    <Link to={`/edit-client/${client.id}`}>
                        <button className='general-btns'>Редактировать</button>
                    </Link>
                    <button className='delete-btns' onClick={() => handleDelete(client.id)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default ClientList;
