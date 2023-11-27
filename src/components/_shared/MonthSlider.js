import React from 'react';
import dayjs from 'dayjs';
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons';
import { DATE_FORMATS } from '../../variables/dates';
import { COLORS } from '../../variables/colors';

const MonthSlider = ({ handlePrevMonth, handleNextMonth, monthIndex }) => {
    return (
        <div className="flex items-center justify-between w-[180px]">
            <button
                className="flex items-center material-icons-outlined cursor-pointer text-gray-600 mx-1"
                onClick={handlePrevMonth}
            >
                <ArrowBackOutline
                    color={COLORS.BLACK}
                    title="previous"
                    height="18px"
                    width="18px"
                />
            </button>

            <h2 className="text-l text-black">
                {dayjs(new Date(dayjs().year(), monthIndex)).format(DATE_FORMATS.DAY_AND_MONTH)}
            </h2>

            <button
                className="flex items-center material-icons-outlined cursor-pointer text-gray-600 mx-1"
                onClick={handleNextMonth}
            >
                <ArrowForwardOutline
                    color={COLORS.BLACK}
                    title="next"
                    height="18px"
                    width="18px"
                />
            </button>
        </div>
    );
};

export default MonthSlider;
