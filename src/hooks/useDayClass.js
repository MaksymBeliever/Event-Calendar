import { useContext } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import { DATE_FORMATS } from '../variables/dates';

export const useDayClass = () => {
    const { monthIndex } = useContext(GlobalContext);

    const getCurrentDayClass = (day, className) => {
        return day.format(DATE_FORMATS.DAY_MONTH_YEAR) === dayjs().format(DATE_FORMATS.DAY_MONTH_YEAR)
            ? className
            : '';
    }

    const getSecondaryDayClass = (secondaryMonthIndex, className) => {
        return secondaryMonthIndex !== monthIndex
            ? className
            : '';
    }

    return {
        getCurrentDayClass,
        getSecondaryDayClass
    };
}
