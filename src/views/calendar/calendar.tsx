import dayjs from "dayjs"
import Calendar from "../../components/Calendar"

function CalendarView() {
  return <div>
    <Calendar value={dayjs('2024-3-19')} locale="en-US" onChange={(date) => {
      console.log(date.format('YYYY-MM-DD'));
    }}></Calendar>
  </div>
}

export default CalendarView