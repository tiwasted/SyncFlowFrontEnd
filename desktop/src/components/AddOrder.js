import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../components/OrderContext';
import api from '../services/tokenService';

const AddOrder = () => {
  const [nameOfOrder, setOrderName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [nameOfClient, setNameOfClient] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [orderSaved, setOrderSaved] = useState(false);
  const { setOrders } = useOrders();
  const navigate = useNavigate();

  const handleSaveOrder = async () => {
    try {
      const formData = new FormData();
      formData.append('order_name', nameOfOrder);
      formData.append('price', price);
      formData.append('order_date', date);
      formData.append('order_time', time);
      formData.append('address', address);
      formData.append('name_client', nameOfClient);
      formData.append('phone_number_client', phoneNumber);
      formData.append('description', description);

      const response = await api.post('http://localhost:8000/orders/b2c-orders/', formData, {
      });

      setOrders((prevOrders) => [...prevOrders, response.data]);
      setOrderSaved(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      setError('Ошибка при добавлении заказа');
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSaveOrder();
  };

  return (
    <React.Fragment>
      <div className="add-order-container">
        <h2 className='add-h2'>Добавить заказ</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="add-form-group">
            <label className='add-label'>Наименование заказа:</label>
            <input 
              type="text" 
              value={nameOfOrder}
              onChange={(e) => setOrderName(e.target.value)} 
            />
          </div>
          <div className="add-form-group">
            <label className='add-label'>Цена:</label>
            <input 
              type="text" 
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
            />
          </div>
          <div className="add-form-group">
            <label className='add-label-date'>Дата:</label>
            <input 
              className='add-input-date' 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
          <div className="add-form-group">
            <label className='add-label-time'>Время:</label>
            <input 
              className='add-input-time' 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>
          <div className="add-form-group">
            <label className='add-label'>Адрес:</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <div className="add-form-group">
            <label className='add-label'>Имя клиента:</label>
            <input 
              type="text" 
              value={nameOfClient}
              onChange={(e) => setNameOfClient(e.target.value)} 
            />
          </div>
          <div className="add-form-group">
            <label className='add-label'>Номер телефона:</label>
            <input 
              type="text" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </div>
          <div className="add-form-group">
            <label className='add-label'>Описание:</label>
            <textarea 
              className='add-textarea' 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <div className='form-btns'>
            <button className='general-btns' type="submit">Сохранить</button>
            <button className='back-btn' onClick={() => navigate(-1)}>Назад</button>
          </div>
        </form>
        {error && <p className="add-error-message">{error}</p>}
        {orderSaved && <div className="add-success-message">Заказ успешно добавлен</div>}
      </div>
    </React.Fragment>
  );
};

export default AddOrder;
