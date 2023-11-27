import { useState } from 'react';
import dayjs from 'dayjs';
import { MONTH_DIRECTION } from '../variables/dates';

export const useDatePicker = () => {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(
        dayjs().month()
    );

    const handleCurrentMonth = (e, direction) => {
        e.preventDefault();

        if (direction === MONTH_DIRECTION.PREV) {
            setCurrentMonthIdx(currentMonthIdx - 1);
            return;
        }

        setCurrentMonthIdx(currentMonthIdx + 1);
    }

    return {
        currentMonthIdx,
        setCurrentMonthIdx,
        handleCurrentMonth
    };
}
