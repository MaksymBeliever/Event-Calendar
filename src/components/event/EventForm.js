import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import {
    Albums,
    Bookmark,
    Checkmark,
    Text,
    Time,
    Trash
} from 'react-ionicons';
import { COLORS } from '../../variables/colors';
import GlobalContext from '../../context/GlobalContext';
import { eventValidationSchema } from '../../schemas/EventValidationSchema';
import { getCurrentDay, getCurrentTime } from '../../utils';
import Button from '../_shared/Button';
import { DATE_FORMATS } from '../../variables/dates';

const labelsClasses = [
    'indigo',
    'gray',
    'orange',
    'blue',
    'red',
    'purple',
];

const EventForm = () => {
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    const formik = useFormik({
        initialValues: {
            title: selectedEvent?.title || '',
            description: selectedEvent?.description || '',
            time: selectedEvent?.time || ''
        },
        validationSchema: eventValidationSchema,
        onSubmit: ({ title, time, description }) => {
            const calendarEvent = {
                title,
                time,
                description,
                day: daySelected.valueOf(),
                created: {
                    day: selectedEvent?.created.day || null,
                    time: selectedEvent?.created.time || null,
                },
                updated: {
                    day: selectedEvent?.updated.day || null,
                    time: selectedEvent?.updated.time || null,
                },
                label: selectedLabel,
                id: selectedEvent ? selectedEvent.id : Date.now(),
            };

            if (selectedEvent) {
                let {day, ...selectedEventDay} = selectedEvent;
                let {day: calendarEventDay, ...restOfCalendarEvent} = calendarEvent;

                if (JSON.stringify(selectedEventDay) === JSON.stringify(restOfCalendarEvent)) {
                    setShowEventModal(false);
                    return;
                }

                dispatchCalEvent({
                    type: 'update',
                    payload: {
                        ...calendarEvent,
                        updated: {
                            day: selectedEvent?.created.day && getCurrentDay(),
                            time: selectedEvent?.created.time && getCurrentTime()
                        },
                    }
                });
            } else {
                dispatchCalEvent({
                    type: 'push',
                    payload: {
                        ...calendarEvent,
                        created: {
                            day: getCurrentDay(),
                            time: getCurrentTime()
                        },
                    }
                });
            }

            setShowEventModal(false);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {selectedEvent && (
                <p className="text-gray-400 text-xs font-semibold mb-3">
                    {selectedEvent.created?.day && !selectedEvent.updated?.day && `Created at: ${selectedEvent.created.day} ${selectedEvent.created.time}`}
                    {selectedEvent.updated?.day && `Updated at: ${selectedEvent.updated.day} ${selectedEvent.updated.time}`}
                </p>
            )}
            <div className="grid grid-cols-1/5 items-end gap-y-2">
                <div></div>

                <input
                    type="text"
                    name="title"
                    placeholder="Add title *"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2
                        border-gray-200 focus:outline-none focus:ring-0 focus:border-cyan-600
                            ${formik.errors.title && formik.touched.title
                                ? 'border-red-600 focus:border-red-600 text-red-600' : ''}`}
                />

                {formik.errors.title && formik.touched.title && (
                    <>
                        <div></div>
                        <p className="text-red-700 text-xs font-semibold">{formik.errors.title}</p>
                    </>
                )}

                <Albums
                    color={COLORS.MIDDLE_GRAY}
                    title="date"
                    height="20px"
                    width="20px"
                />
                <p className="mt-4">{daySelected.format(DATE_FORMATS.FULL_DATE_FORMAT)}</p>

                <Time
                    color={COLORS.MIDDLE_GRAY}
                    title="time"
                    height="20px"
                    width="20px"
                />
                <input
                    type="time"
                    name="time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    className="mt-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200
                        focus:outline-none focus:ring-0 focus:border-cyan-600"
                />

                <Text
                    color={COLORS.MIDDLE_GRAY}
                    title="date"
                    height="20px"
                    width="20px"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Add a description *"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-4 pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200
                        focus:outline-none focus:ring-0 focus:border-cyan-600
                            ${formik.errors.description && formik.touched.description
                                ? 'border-red-600 focus:border-red-600 text-red-600' : ''}`}
                />

                {formik.errors.description && formik.touched.description && (
                    <>
                        <div></div>
                        <p className="text-red-700 text-xs font-semibold">{formik.errors.description}</p>
                    </>
                )}

                <Bookmark
                    color={COLORS.MIDDLE_GRAY}
                    title="date"
                    height="20px"
                    width="20px"
                />
                <div className="mt-4 flex gap-x-2">
                    {labelsClasses.map((lblClass, i) => (
                        <span
                            key={i}
                            onClick={() => setSelectedLabel(lblClass)}
                            className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center
                                justify-center cursor-pointer`}
                        >
                                {selectedLabel === lblClass && (
                                    <Checkmark
                                        color={COLORS.WHITE}
                                        title="date"
                                        height="18px"
                                        width="18px"
                                    />
                                )}
                            </span>
                    ))}
                </div>
            </div>

            <footer className="flex justify-end border-t p-3 mt-5">
                <div className={(selectedEvent ? 'justify-between' : 'justify-end') + ' w-5/12 flex'}>
                    {selectedEvent && (
                        <span
                            onClick={() => {
                                dispatchCalEvent({
                                    type: 'delete',
                                    payload: selectedEvent,
                                });
                                setShowEventModal(false);
                            }}
                            className="px-2 flex justify-center items-center rounded bg-red-600
                                hover:bg-red-700 cursor-pointer"
                        >
                                <Trash
                                    color={COLORS.WHITE}
                                    title="trash"
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                    )}

                    <Button type="submit" name="Save" />
                </div>
            </footer>
        </form>
    );
};

export default EventForm;
