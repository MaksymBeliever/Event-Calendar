import { useState, useContext, useEffect } from 'react';
import { getMonth } from './utils';
import GlobalContext from './context/GlobalContext';
import CalendarHeader from './components/calendar/CalendarHeader';
import Month from './components/calendar/Month';
import EventModal from './components/event/EventModal';
import DatePickerModal from './components/datepicker/DatePickerModal';
import './App.css';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
      monthIndex,
      showEventModal,
      showDatePickerModal
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
      <div className="container m-auto">
        {showEventModal && <EventModal />}
        {showDatePickerModal && <DatePickerModal />}

        <div className="h-screen w-full flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Month month={currentMonth} />
          </div>
        </div>
      </div>
  );
}

export default App;
