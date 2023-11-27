import dayjs from 'dayjs';

export const getMonth = (month = dayjs().month()) => {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
}

export const getCurrentDay = () => {
    return new Date().toLocaleDateString();
}

export const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString().substring(0, 5);
}
