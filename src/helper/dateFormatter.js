export const dateFormatter = (value, type) => {
    var formatDate = new Date(value);
    var year = formatDate.getFullYear();
    var month = formatDate.getMonth() + 1;
    var day = formatDate.getDate();

    var hour = formatDate.getHours();
    var min = formatDate.getMinutes();

    month = month.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');
    hour = hour.toString().padStart(2, '0');
    min = min.toString().padStart(2, '0');

    var returnVal = year + month + day;

    if (type === 'dateTime') {
        returnVal += " " + hour + ":" + min;
    }

    return returnVal;
};
