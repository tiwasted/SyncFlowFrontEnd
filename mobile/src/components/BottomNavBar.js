import React from "react";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import "../styles/BottomNavBar.css";

const Navbar = () => {
  return (
    <footer className="bottom-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/schedule" className="nav-link">
            <CalendarOutlined style={{ fontSize: 30, color: "#4285f4" }} />
            <span>Расписание</span>
        </Link>
        </li>
        <li className="nav-item">
          <a href="/profile" className="nav-link">
            <UserOutlined style={{ fontSize: 30, color: "#4285f4" }} />
            <span>Профиль</span>
        </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Navbar;

