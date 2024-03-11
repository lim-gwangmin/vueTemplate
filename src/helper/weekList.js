export const getWeekList = (calDate) => {
    const thisWeek = [];
    for (let i = 0; i < 7; i++) {
        let resultDay = new Date(calDate.getFullYear(), calDate.getMonth(), calDate.getDate() + (i - calDate.getDay()));
        let yyyy = resultDay.getFullYear();
        let mm = resultDay.getMonth() + 1;
        let dd = resultDay.getDate();

        mm = mm.toString().padStart(2, '0');
        dd = dd.toString().padStart(2, '0');

        let dayArr = ["일", "월", "화", "수", "목", "금", "토"];
        let dayStr = dayArr[resultDay.getDay()];

        thisWeek[i] = { y: yyyy, M: mm, d: dd, dayS: dayStr, dayN: i };
    }

    return thisWeek;
};
