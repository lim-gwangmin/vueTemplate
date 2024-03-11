export const nowDate = (formatDate) => {
    if (formatDate == undefined) {
        formatDate = new Date();
    }
    let year = formatDate.getFullYear();
    let month = formatDate.getMonth() + 1;
    let date = formatDate.getDate();

    let hour = formatDate.getHours();
    let min = formatDate.getMinutes();
    let sec = formatDate.getSeconds();

    let dayArr = ["일", "월", "화", "수", "목", "금", "토"];
    let day = dayArr[formatDate.getDay()];


    month = month.toString().padStart(2, '0');
    date = date.toString().padStart(2, '0');
    hour = hour.toString().padStart(2, '0');
    min = min.toString().padStart(2, '0');
    sec = sec.toString().padStart(2, '0');

    const newDate = {
        yearStr: year,
        monthStr: month,
        dateStr: date,
        dayStr: day,
        hourStr: hour,
        minStr: min,
        secStr: sec
    }

    return newDate;
};
