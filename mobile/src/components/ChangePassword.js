import React, { useState } from 'react';
import api from '../services/tokenService';
// import Notification from './Notification'; // Импортируем Notification
import '../styles/ChangePassword.css';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    // const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Новые пароли не совпадают');
            return;
        }
        if (!currentPassword) {
            setMessage('Введите старый пароль');
            return;
        }
        setLoading(true);

        try {
            await api.put('/users/change-password/', {
                old_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            setMessage('Пароль успешно изменён!');
            setTimeout(() => {
                setIsModalOpen(false);
                setMessage('');
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(`Ошибка: ${error.response.data.detail || 'Неизвестная ошибка'}`);
            } else {
                setMessage('Ошибка при изменении пароля');
            }
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setMessage('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
    };

    return (
        <div className="mainDiv">
            <button className="openModalButton" onClick={openModal}>
                Изменить пароль
            </button>

            {isModalOpen && (
                <div className="modalOverlay">
                    <div className="modalContent">
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
                        {message && <div className="settings-message">{message}</div>}
                    </div>
                </div>
            )}

            {/* {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )} */}
        </div>
    );
};

export default ChangePassword;