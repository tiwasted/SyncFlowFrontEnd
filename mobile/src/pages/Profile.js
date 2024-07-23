import React from 'react';
import '../styles/Profile.css';
import ChangePassword from '../components/ChangePassword';

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <ChangePassword />
    </div>
  );
};

export default Profile;