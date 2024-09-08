import React from "react";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import "../styles/BottomNavBar.css";

const Navbar = () => {
  return (
    <footer className="bottom-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/mweb/schedule" className="nav-link">
            <CalendarOutlined style={{ fontSize: 30, color: "#4285f4" }} />
            <span>Расписание</span>
        </a>
        </li>
        <li className="nav-item">
          <a href="/mweb/profile" className="nav-link">
            <UserOutlined style={{ fontSize: 30, color: "#4285f4" }} />
            <span>Профиль</span>
        </a>
        </li>
      </ul>
    </footer>
  );
};

export default Navbar;
