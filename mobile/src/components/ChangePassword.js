// import React, { useState } from 'react';
// import '../styles/ChangePassword.css'; // Импортируем стили

// const ChangePassword = () => {
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//         alert('Новые пароли не совпадают');
//         return;
//         }
//         setLoading(true);
//         // Логика изменения пароля здесь
//         setTimeout(() => {
//         setLoading(false);
//         alert('Пароль успешно изменен');
//         }, 2000);
//     };

//     return (
//         <div className="mainDiv">
//         <div className="cardStyle">
//             <div id="signupLogo">
//             <h2 className="formTitle">Изменить пароль</h2>
//             </div>
//             <form onSubmit={handleSubmit}>
//             <div className="inputDiv">
//                 <label className="inputLabel" htmlFor="currentPassword">Текущий пароль</label>
//                 <input
//                 type="password"
//                 id="currentPassword"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//                 />
//                 <label className="inputLabel" htmlFor="newPassword">Новый пароль</label>
//                 <input
//                 type="password"
//                 id="newPassword"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 />
//                 <label className="inputLabel" htmlFor="confirmPassword">Подтвердите новый пароль</label>
//                 <input
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 />
//             </div>
//             <div className="buttonWrapper">
//                 <button type="submit" className="submitButton" disabled={loading}>
//                 {loading ? <div id="loader"></div> : 'Изменить пароль'}
//                 </button>
//             </div>
//             </form>
//         </div>
//         </div>
//     );
// };

// export default ChangePassword;



// import React, { useState } from 'react';
// import '../styles/ChangePassword.css'; // Импортируем стили

// const ChangePassword = () => {
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления видимостью модального окна

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             alert('Новые пароли не совпадают');
//             return;
//         }
//         setLoading(true);
//         // Логика изменения пароля здесь
//         setTimeout(() => {
//             setLoading(false);
//             alert('Пароль успешно изменен');
//             setIsModalOpen(false); // Закрыть модальное окно после успешного изменения пароля
//         }, 2000);
//     };

//     // Функция для открытия модального окна
//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     // Функция для закрытия модального окна
//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <div className="mainDiv">
//             {/* Кнопка для открытия модального окна */}
//             <button className="openModalButton" onClick={openModal}>
//                 Изменить пароль
//             </button>

//             {/* Модальное окно */}
//             {isModalOpen && (
//                 <div className="modalOverlay">
//                     <div className="modalContent">
//                         <div id="signupLogo">
//                             <h2 className="formTitle">Изменить пароль</h2>
//                         </div>
//                         <form onSubmit={handleSubmit}>
//                             <div className="inputDiv">
//                                 <label className="inputLabel" htmlFor="currentPassword">Текущий пароль</label>
//                                 <input
//                                     type="password"
//                                     id="currentPassword"
//                                     value={currentPassword}
//                                     onChange={(e) => setCurrentPassword(e.target.value)}
//                                     required
//                                 />
//                                 <label className="inputLabel" htmlFor="newPassword">Новый пароль</label>
//                                 <input
//                                     type="password"
//                                     id="newPassword"
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                     required
//                                 />
//                                 <label className="inputLabel" htmlFor="confirmPassword">Подтвердите новый пароль</label>
//                                 <input
//                                     type="password"
//                                     id="confirmPassword"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="buttonWrapper">
//                                 <button type="submit" className="submitButton" disabled={loading}>
//                                     {loading ? <div id="loader"></div> : 'Изменить пароль'}
//                                 </button>
//                                 <button type="button" className="cancelButton" onClick={closeModal}>
//                                     Отмена
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChangePassword;





import React, { useState } from 'react';
import '../styles/ChangePassword.css'; // Импортируем стили

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления видимостью модального окна

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Новые пароли не совпадают');
            return;
        }
        setLoading(true);
        // Логика изменения пароля здесь
        setTimeout(() => {
            setLoading(false);
            alert('Пароль успешно изменен');
            setIsModalOpen(false); // Закрыть модальное окно после успешного изменения пароля
        }, 2000);
    };

    // Функция для открытия модального окна
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mainDiv">
            {/* Кнопка для открытия модального окна */}
            <button className="openModalButton" onClick={openModal}>
                Изменить пароль
            </button>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        {/* Кнопка-крестик для закрытия модального окна */}
                        <button className="closeButton" onClick={closeModal}>
                            ×
                        </button>
                        <div id="signupLogo">
                            <h2 className="formTitle">Изменить пароль</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="inputDiv">
                                <label className="inputLabel" htmlFor="currentPassword">Текущий пароль</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <label className="inputLabel" htmlFor="newPassword">Новый пароль</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <label className="inputLabel" htmlFor="confirmPassword">Подтвердите новый пароль</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="buttonWrapper">
                                <button type="submit" className="submitButton" disabled={loading}>
                                    {loading ? <div id="loader"></div> : 'Изменить пароль'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
