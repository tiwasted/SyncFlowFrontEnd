import React from 'react';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import '../styles/BottomNavBar.css';

const { Footer } = Layout;

const Navbar = () => {
  return (
    <Footer className="bottom-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/schedule" className="nav-link">
            <CalendarOutlined style={{ fontSize: 30, color: '#4285f4' }} />
            <span>Расписание</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/profile" className="nav-link">
            <UserOutlined style={{ fontSize: 30, color: '#4285f4' }} />
            <span>Профиль</span>
          </a>
        </li>
      </ul>
    </Footer>
  );
};

export default Navbar;
