import dayjs from 'dayjs';
import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { DATE_FORMATS } from '../../variables/dates';
import { useDayClass } from '../../hooks/useDayClass';

const Day = ({ day }) => {
    const [dayEvents, setDayEvents] = useState([]);
    const { getCurrentDayClass, getSecondaryDayClass } = useDayClass();
    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);

    const secondaryMonthIndex = day['$M'];

    const selectDay = () => {
        setDaySelected(day);
        setShowEventModal(true);
    }

    useEffect(() => {
        const events = filteredEvents.filter(
            (event) =>
                dayjs(event.day).format(DATE_FORMATS.DAY_MONTH_YEAR) === day.format(DATE_FORMATS.DAY_MONTH_YEAR)
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    return (
        <div
            className={`border border-gray-200 flex flex-col
                ${getCurrentDayClass(day, 'bg-green-200')}
                    ${getSecondaryDayClass(secondaryMonthIndex, 'bg-gray-100')}`}
        >
            <header className="flex flex-col">
                <div className="flex justify-between items-center">
                    <p
                        className={`text-sm p-1 text-center
                            ${getSecondaryDayClass(secondaryMonthIndex, 'text-gray-400')}`}
                    >
                        {day.format(DATE_FORMATS.DAY_NUMBER).replace(/^0+/, '')}
                    </p>
                    <p
                        className={`text-sm p-1 normal-case
                            ${getSecondaryDayClass(secondaryMonthIndex, 'text-gray-400')}`}
                    >
                        {day.format(DATE_FORMATS.DAY_OF_WEEK)}
                    </p>
                </div>
            </header>
            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={selectDay}
            >
                {dayEvents.map((event, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedEvent(event)}
                        className={`bg-${event.label}-200 p-1 w-11/12
                            text-gray-600 text-sm rounded mb-1 truncate`}
                    >
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Day;
