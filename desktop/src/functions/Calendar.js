// Calendar.js
import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStartDayOfMonth = (date) => {
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDay === 0 ? 6 : startDay - 1;
  };

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const renderHeader = () => {
    const dateFormat = { month: 'long', year: 'numeric' };
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <span>{currentDate.toLocaleDateString('ru-RU', dateFormat)}</span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map(day => (
      <div className="day-of-week" key={day}>{day}</div>
    ));
  };

  const renderDays = () => {
    const monthStart = getStartDayOfMonth(currentDate);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < monthStart; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDate.getDate() === dayDate.getDate() && selectedDate.getMonth() === dayDate.getMonth() && selectedDate.getFullYear() === dayDate.getFullYear();
      
      days.push(
        <div key={day} 
             className={`day ${isSelected ? 'selected' : ''}`} 
             onClick={() => setSelectedDate(dayDate)}>
          {day}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  return (
    <React.Fragment>
      <div className="calendar">
        {renderHeader()}
        <div className="days-of-week">
          {renderDaysOfWeek()}
        </div>
        <div className="days">
          {renderDays()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Calendar;
