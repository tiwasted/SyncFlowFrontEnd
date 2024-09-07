import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = ({ value, onChange }) => {
  const handleDateChange = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    // console.log('Выбранная дата (UTC):', utcDate.toISOString());
    onChange(utcDate);
  };

  return (
    <ReactCalendar
      value={value}
      onChange={handleDateChange}
      className="custom-calendar"
    />
  );
};

export default Calendar;
