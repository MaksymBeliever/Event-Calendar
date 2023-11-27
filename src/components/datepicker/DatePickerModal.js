import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import MiniCalendar from './MiniCalendar';
import EventLabels from '../event/EventLabels';
import ModalLayout from '../../layouts/ModalLayout';

const DatePickerModal = () => {
    const { setShowDatePickerModal } = useContext(GlobalContext);

    return (
        <ModalLayout setShowModal={setShowDatePickerModal}>
            <MiniCalendar />
            <div className="mx-5 mb-4">
                <EventLabels />
            </div>
        </ModalLayout>
    );
}

export default DatePickerModal;
