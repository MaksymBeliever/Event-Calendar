import { createContext } from 'react';

const GlobalContext = createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    miniCalendarMonth: 0,
    setMiniCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showDatePickerModal: false,
    setShowDatePickerModal: () => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({ type, payload }) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    setLabels: () => {},
    labels: [],
    updateLabel: () => {},
    filteredEvents: [],
});

export default GlobalContext;
