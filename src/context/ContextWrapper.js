import { useEffect, useMemo, useReducer, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from './GlobalContext';
import { LOCAL_STORAGE, REST_API } from '../api/constants';
import {
    BASE_URL,
    GET_EVENTS,
    CREATE_EVENT,
    UPDATE_EVENT,
    REMOVE_EVENT
} from '../api/routes';
import {
    getEvents,
    createEvent,
    updateEvent,
    removeEvent
} from '../api/rest';

const typeOfApi = LOCAL_STORAGE;

const savedEventsReducer = (state, { type, payload }) => {
    switch (type) {
        case 'push':
            return [...state, payload];
        case 'update':
            return state.map((event) =>
                event.id === payload.id ? payload : event
            );
        case 'delete':
            return state.filter((event) => event.id !== payload.id);
        default:
            throw new Error();
    }
}

const initEvents = () => {
    if (typeOfApi === LOCAL_STORAGE) {
        const storageEvents = localStorage.getItem('savedEvents');
        return storageEvents ? JSON.parse(storageEvents) : [];
    }

    return getEvents(`${BASE_URL}/${GET_EVENTS}`);
}

export const ContextWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [miniCalendarMonth, setMiniCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
        savedEventsReducer,
        [],
        initEvents
    );

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((event) =>
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(event.label)
        );
    }, [savedEvents, labels]);

    useEffect(() => {
        if (typeOfApi === LOCAL_STORAGE) {
            localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
        }

        if (typeOfApi === REST_API) {
            createEvent(`${BASE_URL}/${CREATE_EVENT}`, savedEvents);
        }

    }, [savedEvents]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map((event) => event.label))].map(
                (label) => {
                    const currentLabel = prevLabels.find(
                        (lbl) => lbl.label === label
                    );
                    return {
                        label,
                        checked: currentLabel ? currentLabel.checked : true,
                    };
                }
            );
        });
    }, [savedEvents]);

    useEffect(() => {
        if (miniCalendarMonth) {
            setMonthIndex(miniCalendarMonth);
        }
    }, [miniCalendarMonth]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    useEffect(() => {
        if (!showDatePickerModal) {
            setShowDatePickerModal(null);
        }
    }, [showDatePickerModal]);

    const updateLabel = (label) => {
        setLabels(
            labels.map((lbl) => (lbl.label === label.label ? label : lbl))
        );
    }

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                miniCalendarMonth,
                setMiniCalendarMonth,
                daySelected,
                setDaySelected,
                showDatePickerModal,
                setShowDatePickerModal,
                showEventModal,
                setShowEventModal,
                dispatchCalEvent,
                selectedEvent,
                setSelectedEvent,
                savedEvents,
                setLabels,
                labels,
                updateLabel,
                filteredEvents,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;
