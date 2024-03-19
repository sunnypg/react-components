import { Dayjs } from 'dayjs';
import { useContext } from 'react';
import LocaleContext from '../locale/LocaleContext';
import alllocales from '../locale';
import '../scss/Header.scss'

interface HeaderProps {
  curMonth: Dayjs
  preMonthHandler: () => void
  nextMonthHandler: () => void
  todayHandler: () => void
}

function Header(props: HeaderProps) {
  const { curMonth, preMonthHandler, nextMonthHandler, todayHandler } = props

  const localeContext = useContext(LocaleContext)
  const CalendarLocale = alllocales[localeContext.locale]

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={preMonthHandler}>&lt;</div>
        <div className="calendar-header-value">{curMonth.format(CalendarLocale.formatMonth)}</div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>&gt;</div>
        <button className="calendar-header-btn" onClick={todayHandler}>{CalendarLocale.today}</button>
      </div>
    </div>
  )
}

export default Header;
