import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../../context/GlobalContext';
import { DATE_FORMATS, MONTH_DIRECTION } from '../../variables/dates';
import { getMonth } from '../../utils';
import { useDatePicker } from '../../hooks/useDatePicker';
import MonthSlider from '../_shared/MonthSlider';

const MiniCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { handleCurrentMonth, currentMonthIdx, setCurrentMonthIdx } = useDatePicker();

    const {
        monthIndex,
        setShowDatePickerModal,
        setMiniCalendarMonth,
        setDaySelected,
        daySelected,
    } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex, setCurrentMonthIdx]);

    const getDayClass = (day) => {
        const nowDay = dayjs().format(DATE_FORMATS.DAY_MONTH_YEAR);
        const currDay = day.format(DATE_FORMATS.DAY_MONTH_YEAR);
        const slcDay = daySelected && daySelected.format(DATE_FORMATS.DAY_MONTH_YEAR);

        if (nowDay === currDay) {
            return 'bg-cyan-600 rounded-full text-white';
        }

        if (currDay === slcDay) {
            return 'bg-cyan-100 rounded-full text-cyan-600 font-bold';
        }

        return '';
    }

    return (
        <div className="mt-2">
            <header className="flex justify-center">
                <div className="mb-4">
                    <MonthSlider
                        handlePrevMonth={(e) => handleCurrentMonth(e, MONTH_DIRECTION.PREV)}
                        handleNextMonth={(e) => handleCurrentMonth(e,MONTH_DIRECTION.NEXT)}
                        monthIndex={currentMonthIdx}
                    />
                </div>
            </header>
            <div className="h-[280px] grid grid-cols-7 grid-rows-6">
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-sm py-1 text-center">
                        {day.format(DATE_FORMATS.DAY_OF_WEEK).charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMiniCalendarMonth(currentMonthIdx);
                                    setDaySelected(day);
                                    setShowDatePickerModal(false);
                                }}
                                className={`py-1 w-full ${getDayClass(day)}`}
                            >
                                <span className="text-sm">{day.format(DATE_FORMATS.DAY_NUMBER)}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default MiniCalendar;
