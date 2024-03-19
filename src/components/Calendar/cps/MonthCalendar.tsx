import { Dayjs } from "dayjs";
import { CalendarProps } from "../index"
import { useContext } from "react";
import LocaleContext from "../locale/LocaleContext";
import alllocales from "../locale";
import cs from "classnames";
import '../scss/MonthCalendar.scss'

interface MonthCalendarProps extends CalendarProps {
  curMonth: Dayjs
  selectHandler?: (date: Dayjs) => void
}

function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month');  // 本月开始日期对象
  const day = startDate.day();  // 本月第一天星期几

  const daysInfo: Array<{ date: Dayjs, currentMonth: boolean }> = new Array(6 * 7);

  // 计算上个月的天数
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'), // subtract 返回减去一定时间的日期对象
      currentMonth: false
    }
  }

  // 计算本月的天数 以及 下个月的天数
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day');

    daysInfo[i] = {
      date: startDate.add(i - day, 'day'), // add 返回加上一定时间的日期对象
      currentMonth: calcDate.month() === date.month()
    }
  }

  return daysInfo
}

function renderDays(
  days: Array<{ date: Dayjs, currentMonth: boolean }>,
  dateRander: MonthCalendarProps['dateRander'],
  dateInnerContent: MonthCalendarProps['dateInnerContent'],
  value: Dayjs,
  selectHandler: MonthCalendarProps['selectHandler']
) {
  const rows = []
  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j];
      row[j] = <div key={`${i}-${j}`} onClick={() => selectHandler?.(item.date)} className={"calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')} >
        {
          dateRander ? dateRander(item.date) : (
            <div className="calendar-month-body-cell-date">
              <div className={
                cs("calendar-month-body-cell-date-value",
                  value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD') ? "calendar-month-body-cell-date-selected" : "")
              }>{item.date.date()}</div>
              <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(item.date)}</div>
            </div>
          )
        }
      </div>
    }
    rows.push(row)
  }

  return rows.map((row, i) => <div key={i} className="calendar-month-body-row">{row}</div>)
}

function MonthCalendar(props: MonthCalendarProps) {
  const { value, curMonth, dateRander, dateInnerContent, selectHandler } = props

  const localeContext = useContext(LocaleContext)
  const CalendarLocale = alllocales[localeContext.locale]

  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  const allDays = getAllDays(curMonth)

  return <div className="calendar-month">
    <div className="calendar-month-week-list">
      {weekList.map((week) => (
        <div className="calendar-month-week-list-item" key={week}>
          {CalendarLocale.week[week]}
        </div>
      ))}
    </div>
    <div className="calendar-month-body">
      {renderDays(allDays, dateRander, dateInnerContent, value, selectHandler)}
    </div>
  </div>
}

export default MonthCalendar;
