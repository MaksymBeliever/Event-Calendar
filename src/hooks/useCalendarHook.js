import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { MONTH_DIRECTION } from '../variables/dates';

export const useCalendarHook = () => {
    const { setMonthIndex } = useContext(GlobalContext);

    const handleMonth = (e, direction, monthIndex) => {
        e.preventDefault();

        if (direction === MONTH_DIRECTION.PREV) {
            setMonthIndex(monthIndex - 1);
            return;
        }

        setMonthIndex(monthIndex + 1);
    }

    return {
        handleMonth
    };
}
