// SideBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as IconMain} from '../Icons/iconMain.svg';
import {ReactComponent as IconSchedule} from '../Icons/iconSchedule.svg'
// import {ReactComponent as IconServices} from '../Icons/iconServices.svg'
import {ReactComponent as IconSettings} from '..//Icons/iconSettings.svg'
import {ReactComponent as IconHistoryOfOrders} from '..//Icons/iconHistoryOfOrders.svg'

const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <Link to="/main" className="logo-link">Our Project</Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/dashboard" activeclassname="active"><IconMain className='icon'/>Dashboard</Link></li>
          {/* <li className="nav-item"><Link to="/services" activeclassname="active"><IconServices className='icon'/>Услуги для клиентов</Link></li> */}
          <li className="nav-item"><Link to="/schedule" activeclassname="active"><IconSchedule className='icon'/>Расписание</Link></li>
          <li className="nav-item"><Link to="/history-of-orders" activeclassname="active"><IconHistoryOfOrders className='icon'/>История заказов</Link></li>
          {/* <li className="nav-item"><Link to="/employees" activeclassname="active"><IconSettings className='icon'/>Сотрудники</Link></li> */}
          <li className="nav-item"><Link to="/employees" activeclassname="active"><IconSettings className='icon'/>Сотрудники</Link></li>
          <li className='nav-item'><Link to="/settings" activeclassname="active"><IconSettings className='icon'/>Настройки</Link></li>
          
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;

