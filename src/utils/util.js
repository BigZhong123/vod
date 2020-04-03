export const computedTime = function(time) {
    let timeString = '';
    let hour = 0, min = 0, second = 0;
    hour = Math.floor(time / 3600);
    min = Math.floor((time - 3600 * hour) / 60);
    second = time - (3600 * hour + 60 * min);
    if (hour !== 0) {
        if((hour + '').length === 1) {
            hour = '0' + hour
        }
        timeString = hour + ':' + timeString;
    }
    if ((min + '').length === 1) {
        min = '0' + min
    }
    timeString = timeString + min + ':'
    if ((second + '').length === 1) {
        second = '0' + second + ':';
    }
    timeString += second;
    return timeString;
}