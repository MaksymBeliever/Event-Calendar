import { useContext } from 'react';
import { Add } from 'react-ionicons';
import GlobalContext from '../../context/GlobalContext';
const CreateEventButton = () => {
    const { setShowEventModal } = useContext(GlobalContext);
    return (
        <button
            onClick={() => setShowEventModal(true)}
            className="p-1 bg-cyan-600 rounded-full text-white
                flex items-center shadow-md hover:shadow-2xl"
        >
            <Add
                color="#FFFFFF"
                title="create"
                height="25px"
                width="25px"
            />
        </button>
    );
}

export default CreateEventButton;
