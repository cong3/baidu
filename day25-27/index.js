// 补0
function addZero(num) {
    return '0'+num;
}
// 根据时间获取当前星期
function getWeek(time) {
    var date = new Date(time);
    var str  = '';
    var num  = date.getDay();
    switch (num) {
        case 0:
            str = 'Sunday';
        case 1:
            str = 'Monday';
        case 2:
            str = 'Tuesday';
        case 3:
            str = 'Wednesday';
        case 4:
            str = 'Thursday';
        case 5:
            str = 'Friday';
        case 6:
            str = 'Saturday';
    }
    return str;
}
// 根据时间获取当前年
function getYear(time) {
    var date = new Date(time);
    return date.getFullYear();
}
// 根据时间获取当前月
function getMonth(time) {
    var date = new Date(time);
    var res  = date.getMonth()+1;
    if (res < 10) {
        res = addZero(res);
    }
    return res;
}
// 根据时间获取当前日
function getDay(time) {
    var date = new Date(time);
    var res  = date.getDate();
    if (res < 10) {
        res = addZero(res);
    }
    return res;
}
// 获取小时
function getHour(time) {
    var date = new Date(time);
    var res  = date.getHours();
    if (res < 10) {
        res = addZero(res);
    }
    return res;
}
// 获取分
function getMinute(time) {
    var date = new Date(time);
    var res  = date.getMinutes();
    if (res < 10) {
        res = addZero(res);
    }
    return res;
}
// 获取秒
function getSecond(time) {
    var date = new Date(time);
    var res  = date.getSeconds();
    if (res < 10) {
        res = addZero(res);
    }
    return res;
}
var p = document.getElementById("time");
function getTime() {
    var date = new Date();
    var time = date.getTime();
    var year = getYear(time);
    var month= getMonth(time);
    var day  = getDay(time);
    var week = getWeek(time);
    var hour = getHour(time);
    var minute = getMinute(time);
    var second = getSecond(time);
    var m = 'AM';
    if (hour >12) {
        m = 'PM';
    }
    var str = year+' 年 '+month+' 月 '+day+' 日 '+week+' ' +hour+':'+minute+':'+second+m;
    p.textContent = str;
}
setInterval(getTime,1000);
