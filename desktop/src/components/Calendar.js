import React from "react";
import Calendar from "react-calendar";
import "../styles/Calendar.css";


const CalendarComponent = ({ value, onDateChange }) => {
  const handleDateChange = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    console.log("Выбранная дата (UTC):", utcDate.toISOString());
    onDateChange(utcDate);
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={value}
      className="custom-calendar"
    />
  );
};

export default CalendarComponent;
