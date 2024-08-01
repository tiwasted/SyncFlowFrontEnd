import React from 'react';
// import api from '../services/tokenService';
import ClientList from '../components/ClientList';
import { Link } from 'react-router-dom';

const B2Bclients = () => {
    
    const { b2bOrders } = useOrders();

    return (
        <div className='b2b-clients'>
            <h1>Список постоянных клиентов</h1>
            <Link to="/add-b2b-order">
                <button className='general-btns'>Создать заказ</button>
            </Link>
            <div className='b2b-clients-content'>
                {b2bOrders && <ClientList orders={b2bOrders} />}
                <ClientList />
            </div>
        </div>
    );
}

export default B2Bclients;
