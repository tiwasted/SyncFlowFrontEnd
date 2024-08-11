import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import '../styles/BottomNavBar.css';

const { Footer } = Layout;

const Navbar = () => {
  return (
    <Footer className="bottom-nav">
      <ul className="nav-list">
        <li className="nav-item">
        <Link to="/schedule" className="nav-link">
            <CalendarOutlined style={{ fontSize: 30, color: '#4285f4' }} />
            <span>Расписание</span>
        </Link>
        </li>
        <li className="nav-item">
        <Link to="/profile" className="nav-link">
            <UserOutlined style={{ fontSize: 30, color: '#4285f4' }} />
            <span>Профиль</span>
        </Link>
        </li>
      </ul>
    </Footer>
  );
};

export default Navbar;
