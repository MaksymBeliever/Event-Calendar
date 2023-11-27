import { useContext } from 'react';
import { CalendarClearOutline } from 'react-ionicons';
import GlobalContext from '../../context/GlobalContext';
import { COLORS } from '../../variables/colors';
import { MONTH_DIRECTION } from '../../variables/dates';
import { useCalendarHook } from '../../hooks/useCalendarHook';
import CreateEventButton from '../event/CreateEventButton';
import MonthSlider from '../_shared/MonthSlider';

const CalendarHeader = () => {
    const { monthIndex, setShowDatePickerModal } = useContext(GlobalContext);
    const { handleMonth } = useCalendarHook();

    return (
        <header className="py-2 flex items-center justify-between">
            <CreateEventButton />

            <div className="flex">
                <MonthSlider
                    handlePrevMonth={(e) => handleMonth(e, MONTH_DIRECTION.PREV, monthIndex)}
                    handleNextMonth={(e) => handleMonth(e, MONTH_DIRECTION.NEXT, monthIndex)}
                    monthIndex={monthIndex}
                />

                <button
                    onClick={() => setShowDatePickerModal(true)}
                    className="border border-gray-400 rounded py-1 px-3 ml-5
                        hover:bg-cyan-600 cursor-pointer"
                >
                    <CalendarClearOutline
                        color={COLORS.BLACK}
                        title="calendar"
                        height="20px"
                        width="20px"
                    />
                </button>
            </div>
        </header>
    );
}

export default CalendarHeader;
