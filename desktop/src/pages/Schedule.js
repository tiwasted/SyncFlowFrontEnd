// Schedule.js
import React from 'react';
import Calendar from '../functions/Calendar';

const Schedule = () => {
  return (
    <React.Fragment className="schedule-container">
      <div className="schedule-content">
        <h2 className='h2-schedule'>Расписание</h2>
        <div className="order-list-container">
          <h3 className='h3-schedule'>Список заказов</h3>
        </div>
        <div className="calendar-container">
          <h3 className='h3-schedule'>Календарь</h3>
          <Calendar />
        </div>
      </div> 
    </React.Fragment>
  );
};

export default Schedule;
