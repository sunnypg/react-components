import React, { useEffect, useRef } from "react";
import InternalCalendar, { CalendarRef } from "../components/Mini-Calendar";
const Calendar = React.forwardRef(InternalCalendar)

function MiniCalendarView() {
  const calendarRef = useRef<CalendarRef>(null)

  useEffect(() => {
    setTimeout(() => {
      calendarRef.current?.setDate(new Date('2022-3-18'));
    }, 3000)

  }, [])

  return (
    <div>
      <Calendar value={new Date('2024-3-16')} ></Calendar>
      <Calendar ref={calendarRef} value={new Date('2023-3-16')} onChange={(date: Date) => {
        calendarRef.current?.setDate(date)
      }}></Calendar>
    </div >
  );
}

export default MiniCalendarView