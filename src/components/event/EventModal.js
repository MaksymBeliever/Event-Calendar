import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import ModalLayout from '../../layouts/ModalLayout';
import EventForm from './EventForm';

const EventModal = () => {

    const { setShowEventModal } = useContext(GlobalContext);

    return (
        <ModalLayout setShowModal={setShowEventModal}>
            <EventForm />
        </ModalLayout>
    );
}

export default EventModal;
