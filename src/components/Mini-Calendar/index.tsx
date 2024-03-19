import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import './index.scss';

interface CalendarProps {
  value?: Date
  onChange?: (event: Date) => void
}

export interface CalendarRef {
  getDate: () => Date
  setDate: (date: Date) => void
}

const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  const { value = new Date(), onChange } = props

  const [date, setDate] = useState(value);

  // 给外界暴露的方法
  useImperativeHandle(ref, () => {
    return {
      getDate: () => date,
      setDate: (date: Date) => {
        setDate(date);
      }
    }
  });

  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  // 上个月
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  // 下个月
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // 计算当月天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 计算当月第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // 计算当月最后一天是星期几
  const lastDayOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDay();
  };

  const renderDays = () => {
    const days = [];

    // 当月天数
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    // 第一天是星期几
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    // 最后一天是星期几
    const lastDay = lastDayOfMonth(date.getFullYear(), date.getMonth());

    // 上个月日期
    for (let i = firstDay; i > 0; i--) {
      const prevMonthDay = new Date(date.getFullYear(), date.getMonth(), -(i - 1)).getDate();
      days.push(<div key={`prevMonthDay-${i}`} className="prevMonthDay">{prevMonthDay}</div>);
    }

    // 当月日期
    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i));
      days.push(<div key={i} className={`${i === date.getDate() ? 'day selected' : 'day'}`} onClick={clickHandler}>{i}</div>);
    }

    // 下个月日期
    let nextMonthDay = 1;
    for (let i = lastDay; i < 6; i++) {
      days.push(<div key={`nextMonthDay-${i}`} className="nextMonthDay">{nextMonthDay++}</div>);
    }

    return days;
  };

  return (
    <div className="mini-calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{date.getFullYear()}年{monthNames[date.getMonth()]}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
}

export default InternalCalendar;
