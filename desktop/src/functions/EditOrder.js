// EditOrder.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useOrders } from './OrderContext';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Заменили useHistory на useNavigate
  const { orders, setOrders } = useOrders();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Найти заказ по ID
    const orderToEdit = orders.find(order => order.id === parseInt(id));
    if (orderToEdit) {
      setOrder(orderToEdit);
      setIsLoading(false);
    } else {
      // Если заказ не найден, получить его с сервера
      const fetchOrder = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axios.get(`http://localhost:8000/orders/b2c-orders/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setOrder(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Ошибка при получении заказа", error);
          setError('Ошибка при получении заказа');
          setIsLoading(false);
        }
      };

      fetchOrder();
    }
  }, [id, orders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:8000/orders/b2c-orders/${id}/`, order, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Обновление локального состояния заказов
      const updatedOrders = orders.map(o => (o.id === order.id ? order : o));
      setOrders(updatedOrders);

      // Возврат на страницу Dashboard после успешного обновления
      navigate('/dashboard'); // Заменили history.push на navigate
    } catch (error) {
      console.error("Ошибка при обновлении заказа", error);
      setError('Ошибка при обновлении заказа');
    }
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Редактировать заказ</h3>
      <div>
        <label>Наименование заказа:</label>
        <input
          type="text"
          name="order_name"
          value={order.order_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Цена:</label>
        <input
          type="number"
          name="price"
          value={order.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Имя клиента:</label>
        <input
          type="text"
          name="name_client"
          value={order.name_client}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Телефон клиента:</label>
        <input
          type="text"
          name="phone_number_client"
          value={order.phone_number_client}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Дата:</label>
        <input
          type="date"
          name="order_date"
          value={order.order_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Время:</label>
        <input
          type="time"
          name="order_time"
          value={order.order_time}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Адрес:</label>
        <input
          type="text"
          name="address"
          value={order.address}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <label>Описание:</label>
        <textarea
          name="description"
          value={order.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
        name="status"
        value={order.status}
        ></label>
      </div>
      <button type="submit" className='general-btns'>Сохранить изменения</button>
    </form>
  );
};

export default EditOrder;
