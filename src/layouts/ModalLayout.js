import { Close } from 'react-ionicons';
import { COLORS } from '../variables/colors';

const ModalLayout = ({ setShowModal, children }) => {
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <div className="min-w-[340px] bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-200 px-4 py-2 flex justify-end items-center">
                    <button
                        className="p-1 rounded-full hover:bg-gray-300"
                        onClick={() => setShowModal(false)}
                    >
                        <Close
                            color={COLORS.MIDDLE_GRAY}
                            title="close"
                            height="20px"
                            width="20px"
                        />
                    </button>
                </header>
                <div className="p-3">{children}</div>
            </div>
        </div>
    );
};

export default ModalLayout;
