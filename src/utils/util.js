// import Vue from 'vue';
import moment from 'moment';

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

// 格式化时间为 刚刚 几分钟前 几小时前 几周前 几月前 或者是具体的时间
export const timeago = function(dateTimeStamp) {
    let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let now = new Date().getTime();   //获取当前时间毫秒
    let diffValue = now - dateTimeStamp;//时间差
    let result = '';
    if (diffValue < 0) {
        return '传入的时间戳大于当前时间戳';
    }
    let minC = diffValue / minute;  //计算时间差的分，时，天，周，月
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
    } else {
        result = moment(dateTimeStamp).format('YYYY-MM-DD')
    }
    return result;
}