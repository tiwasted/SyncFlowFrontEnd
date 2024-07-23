import React, { useState } from 'react';
import '../styles/ChangePassword.css'; // Импортируем стили

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
        }, 2000);
    };

    return (
        <div className="mainDiv">
        <div className="cardStyle">
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
    );
};

export default ChangePassword;
