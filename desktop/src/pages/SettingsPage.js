// import React, { useState } from 'react';
// import axios from 'axios';

// const SettingsPage = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [showModal, setShowModal] = useState(false); // Управление видимостью модального окна
//   const [message, setMessage] = useState(''); // Сообщение об успехе или ошибке

//   // Открыть модальное окно
//   const handleOpenModal = () => {
//     setShowModal(true);
//     setOldPassword('');
//     setNewPassword('');
//     setMessage('');
//   };

//   // Закрыть модальное окно
//   const handleCloseModal = () => setShowModal(false);

//   // Обработчик изменения пароля
//   const handlePasswordChange = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Получение JWT токена из локального хранилища
//       await axios.post(
//         'http://localhost:8000/api/change-password/',
//         { old_password: oldPassword, new_password: newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage('Пароль успешно изменён!');
//       setTimeout(() => {
//         handleCloseModal();
//       }, 2000);
//     } catch (error) {
//       setMessage('Ошибка при изменении пароля');
//     }
//   };

//   return (
//     <div>
//       <h1>Настройки</h1>
//       <button className="general-btns" onClick={handleOpenModal}>
//         Изменить пароль
//       </button>

//       {/* Модальное окно */}
//       {showModal && (
//         <div className="add-order-container">
//           <div className="add-form-group">
//             <div className="">
//               <h2>Изменение пароля</h2>
//             </div>
//             <div className="add-label">
//               <input
//                 type="password"
//                 placeholder="Старый пароль"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="add-label"
//               />
//               <input
//                 type="password"
//                 placeholder="Новый пароль"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="add-label"
//               />
//               {message && <p className="message">{message}</p>}
//             </div>
//             <div className="form-btns">
//               <button className="general-btns" onClick={handlePasswordChange}>
//                 Сохранить изменения
//               </button>
//               <button className="general-btns" onClick={handleCloseModal}>
//                 Закрыть
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SettingsPage;




import React, { useState } from 'react';
import axios from 'axios';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // Добавлено состояние для подтверждения нового пароля
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword(''); // Сброс состояния подтверждения пароля
    setMessage('');
  };

  const handleCloseModal = () => setShowModal(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) { // Проверка совпадения нового пароля и его подтверждения
      setMessage('Новый пароль и его подтверждение не совпадают');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/change-password/',
        { old_password: oldPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Пароль успешно изменён!');
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      setMessage('Ошибка при изменении пароля');
    }
  };

  return (
    <div>
      <h1>Настройки</h1>
      <button className="general-btns" onClick={handleOpenModal}>
        Изменить пароль
      </button>

      {showModal && (
        <div className="add-order-container">
          <div className="add-form-group">
            <div>
              <h2 className='add-form-group'>Изменение пароля</h2>
            </div>
            <div className=''>
              <input
                type="password"
                placeholder="Старый пароль"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="add-form-group"
              />
              <input
                type="password"
                placeholder="Новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="add-form-group"
              />
              <input
                type="password"
                placeholder="Подтвердите новый пароль" // Новое поле для подтверждения пароля
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="add-form-group"
              />
              {message && <p className="message">{message}</p>}
            </div>
            <div className="form-btns">
              <button className="general-btns" onClick={handlePasswordChange}>
                Сохранить изменения
              </button>
              <button className="general-btns" onClick={handleCloseModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
