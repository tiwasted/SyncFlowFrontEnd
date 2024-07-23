import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Calendar = ({ value, onChange }) => {
    return (
        <ReactCalendar
            value={value} // Используем свойство value вместо date
            onChange={onChange}
            className="custom-calendar" // Добавляем класс для стилизации
        />
    );
};

export default Calendar;
