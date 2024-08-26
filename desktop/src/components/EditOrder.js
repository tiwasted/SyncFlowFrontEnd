import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useOrders } from "../context/OrderProvider";
import api from "../services/TokenService";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, setOrders } = useOrders();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем предыдущий путь из состояния
  const previousPath = location.state?.from;

  useEffect(() => {
    const orderToEdit = orders.find((order) => order.id === parseInt(id));
    if (orderToEdit) {
      setOrder(orderToEdit);
      setIsLoading(false);
    } else {
      const fetchOrder = async () => {
        try {
          const response = await api.get(`/orders/b2c-orders/${id}/`);
          setOrder(response.data);
          setIsLoading(false);
        } catch (error) {
          // console.error("Ошибка при получении заказа", error);
          setError("Ошибка при получении заказа");
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
      await api.put(`/orders/b2c-orders/${id}/`, order);
      const updatedOrders = orders.map((o) => (o.id === order.id ? order : o));
      setOrders(updatedOrders);
      navigate(previousPath); // Перенаправление на предыдущую страницу
    } catch (error) {
      // console.error("Ошибка при обновлении заказа", error);
      setError("Ошибка при обновлении заказа");
    }
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="add-order-container">
      <h2 className="add-h2">Редактировать заказ</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-form-group">
          <label className="add-label">Наименование заказа:</label>
          <input
            type="text"
            name="order_name"
            value={order.order_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          <label className="add-label">Цена:</label>
          <input
            type="number"
            name="price"
            value={order.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          <label className="add-label">Имя клиента:</label>
          <input
            type="text"
            name="name_client"
            value={order.name_client}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          <label className="add-label">Телефон клиента:</label>
          <input
            type="text"
            name="phone_number_client"
            value={order.phone_number_client}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          <label className="add-label">Дата:</label>
          <input
            type="date"
            name="order_date"
            value={order.order_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          <label className="add-label">Время:</label>
          <input
            type="time"
            name="order_time"
            value={order.order_time}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          <label className="add-label">Адрес:</label>
          <input
            type="text"
            name="address"
            value={order.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          <label className="add-label">Описание:</label>
          <textarea
            className="add-textarea"
            name="description"
            value={order.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-form-group">
          {/* <label className='add-label'>Статус:</label> */}
          <div name="status" value={order.status} onChange={handleInputChange}>
            {/* <option value="in_processing">In Processing</option> */}
          </div>
        </div>
        <div className="form-btns">
          <button type="submit" className="general-btns">
            Сохранить изменения
          </button>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
