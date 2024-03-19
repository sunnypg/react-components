import dayjs, { Dayjs } from 'dayjs';
import MonthCalendar from './cps/MonthCalendar';
import Header from './cps/Header';
import { CSSProperties, ReactNode, useState } from 'react';
import cs from 'classnames';
import localeContext from './locale/LocaleContext';

export interface CalendarProps {
  value: Dayjs
  style?: CSSProperties
  className?: string | string[]
  // 定制日期显示，会完全覆盖日期单元格
  dateRander?: (currentDate: Dayjs) => ReactNode
  // 定制日期单元格，内容会添加到单元格内，只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode
  // 国际化相关
  locale?: string
  onChange?: (value: Dayjs) => void
}

const Calendar = (props: CalendarProps) => {
  const { value, style, className, locale, onChange } = props

  const [curDate, setCurDate] = useState<Dayjs>(value)
  const [curMonth, setCurMonth] = useState<Dayjs>(value)

  const classNames = cs('calendar', className)

  function changeDate(date: Dayjs) {
    setCurDate(date)
    setCurMonth(date)
    onChange?.(date)
  }

  function selectHandler(date: Dayjs) {
    changeDate(date)
  }

  function preMonthHandler() {
    setCurMonth(curMonth.subtract(1, 'month'))
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, 'month'))
  }

  function todayHandler() {
    const date = dayjs(Date.now())
    changeDate(date)
  }

  return (
    <localeContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        <Header curMonth={curMonth} preMonthHandler={preMonthHandler} nextMonthHandler={nextMonthHandler} todayHandler={todayHandler}></Header>
        <MonthCalendar {...props} value={curDate} curMonth={curMonth} selectHandler={selectHandler}></MonthCalendar>
      </div>
    </localeContext.Provider>
  )
}

export default Calendar