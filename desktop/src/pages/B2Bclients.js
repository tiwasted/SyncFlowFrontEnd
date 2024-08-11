import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddB2BClient from '../components/AddB2BClient';
import B2BClientList from '../components/B2BClientList';

const B2Bclients = () => {
    const [b2bClients, setB2BClients] = useState([]);

    useEffect(() => {
        fetchB2BClients();
    }, []);

    const fetchB2BClients = async () => {
        try {
            const response = await axios.get('/api/b2bclients/');
            setB2BClients(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка клиентов B2B:', error);
        }
    };

    const handleB2BClientAdded = (newB2BClient) => {
        setB2BClients([...b2bClients, newB2BClient]);
    };

    const handleB2BClientDeleted = (b2bClientId) => {
        setB2BClients(b2bClients.filter(b2bClient => b2bClient.id !== b2bClientId));
    };

    // Обработчики для кнопок
    const handleCreateOrderClick = () => {
        // Логика для создания заказа B2B
        console.log('Создать заказ B2B');
    };

    const handleAddClientClick = () => {
        // Логика для добавления клиента B2B
        console.log('Добавить клиента B2B');
    };

    return (
        <div>
            <h1>Список постоянных клиентов</h1>
            <div style={{ marginBottom: '20px' }}>
                <button className='general-btns' onClick={handleCreateOrderClick} style={{ marginRight: '10px' }}>Создать заказ B2B</button>
                <button className='general-btns' onClick={handleAddClientClick}>Добавить клиента B2B</button>
            </div>
            <AddB2BClient onB2BClientAdded={handleB2BClientAdded} />
            <B2BClientList b2bClients={b2bClients} onDeleteB2BClient={handleB2BClientDeleted} />
        </div>
    );
};

export default B2Bclients;
