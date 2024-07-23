import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Calendar = ({ value, onChange }) => {
    const handleDateChange = (date) => {

        // Устанавливаем время на полночь в локальном часовом поясе
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        console.log('Выбранная дата (UTC):', utcDate.toISOString());
        onChange(utcDate);
    };

    return (
        <ReactCalendar
            value={value} // Используем свойство value вместо date
            onChange={handleDateChange}
            className="custom-calendar" // Добавляем класс для стилизации
        />
    );
};

export default Calendar;
