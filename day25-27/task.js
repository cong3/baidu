function addZero(num) {
    return '0'+num;
}
// 根据时间获取当前星期 时间戳
function getWeek(time) {
    var date = new Date(time);
    var str  = '';
    var num  = date.getDay();
    switch (num) {
        case 0:
            str = '日';
            break
        case 1:
            str = '一';
            break;
        case 2:
            str = '二';
            break;
        case 3:
            str = '三';
            break;
        case 4:
            str = '四';
            break;
        case 5:
            str = '五';
            break;
        case 6:
            str = '六';
            break;
    }
    return str;
}
// 渲染年
function year() {
    var year = document.getElementById("year-select");
    for (var i=2000; i<=2100; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}
// 获取年
function getYear() {
    var year = document.getElementById("year-select");
    var options = year.querySelectorAll("option");
    var option = '';
    for (var i=0;length = options.length, i<length;i++) {
        if (options[i].selected == true) {
            option = options[i];
            break;
        }
    }
    return option.value;
}
// 渲染月
function month() {
    var month = document.getElementById("month-select");
    for (var i=1; i<=12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        month.appendChild(option);
    }
}
// 获取月
function getMonth() {
    var month = document.getElementById("month-select");
    var options = month.querySelectorAll("option");
    var option = '';
    for (var i=0;length = options.length, i<length;i++) {
        if (options[i].selected == true) {
            option = options[i];
            break;
        }
    }
    return option.value;

}
// 渲染日
function day() {
    var month= getMonth();
    var days;
    if (month==2) {
        var year = getYear();
        if (year % 400 ==0) {
            // 闰年
            days = 29;
        } else if (year%4 == 0 && year%100 != 0) {
            days = 29;
        }else {
            days = 28;
        }
    } else if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12) {
        days = 31;
    }else {
        days = 30;
    }

    var day = document.getElementById("day-select");
    day.innerHTML = '';
    for (var i=1; i<=days; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        day.appendChild(option);
    }
}
// 获取日
function getDay() {
    var day = document.getElementById("day-select");
    var options = day.querySelectorAll("option");
    var option = '';
    for (var i=0;length = options.length, i<length;i++) {
        if (options[i].selected == true) {
            option = options[i];
            break;
        }
    }
    return option.value;
}
// 渲染时
function hour() {
    var hour = document.getElementById("hour-select");
    for (var i=0; i<24;i++) {
        var option = document.createElement("option");
        option.value = i;
        if (i <10) {
            i = addZero(i);
        }
        option.textContent = i;
        hour.appendChild(option);
    }

}
// 获取时
function getHour() {
    var hour = document.getElementById("hour-select");
    var options = hour.querySelectorAll("option");
    var option = '';
    for (var i=0;length = options.length, i<length;i++) {
        if (options[i].selected == true) {
            option = options[i];
            break;
        }
    }
    return option.value;
}
// 渲染分
function minute() {
    var minute = document.getElementById("minute-select");
    for (var i=0; i<60;i++) {
        var option = document.createElement("option");
        option.value = i;
        if (i <10) {
            i = addZero(i);
        }
        option.textContent = i;
        minute.appendChild(option);
    }
}
// 获取分
function getMinute() {
    var minute = document.getElementById("minute-select");
    var options = minute.querySelectorAll("option");
    var option = '';
    for (var i=0;length = options.length, i<length;i++) {
        if (options[i].selected == true) {
            option = options[i];
            break;
        }
    }
    return option.value;
}
// 渲染秒
function second() {
    var second = document.getElementById("second-select");
    for (var i=0; i<60;i++) {
        var option = document.createElement("option");
        option.value = i;
        if (i <10) {
            i = addZero(i);
        }
        option.textContent = i;
        second.appendChild(option);
    }
}
// 获取秒
function getSecond() {
    var second = document.getElementById("second-select");
    var options = second.querySelectorAll("option");
    var option = '';
    for (var i=0;length = options.length, i<length;i++) {
        if (options[i].selected == true) {
            option = options[i];
            break;
        }
    }
    return option.value;
}
// 获取过去的时间 时间戳
function chooseTime() {
    var year  = getYear();
    var month = getMonth();
    var day   = getDay();
    var hour  = getHour();
    var minute= getMinute();
    var second= getSecond();
    var str = year+'-'+month+'-'+day+'-'+hour+':'+minute+':'+second;
    var time = new Date(str);
    return time;
}
// 格式化一个时间 // 时间戳
function geshi(time) {
    var date = new Date(time);
    var year =date.getFullYear();
    var month = date.getMonth()+1;
    var day  = date.getDay();
    var week = getWeek(time);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (month < 10) {
        month = addZero(month);
    }
    if (day < 10) {
        day = addZero(day);
    }
    if (hour < 10) {
        hour = addZero(hour);
    }
    if (minute < 10) {
        minute = addZero(minute);
    }
    if (second < 10) {
        second = addZero(second);
    }
    var str = year+'年'+month+'月'+day+'日'+'星期'+week+hour+':'+minute+':'+second;
    return str;
}
// 计算时间 时间戳
function distance(now, last, id) {
    var nowTime = Math.floor(now/1000);
    var chooseTime = Math.floor(last/1000);
    diff = nowTime - chooseTime;
    var flag  = 0;
    var day   = 0;
    var hour  = 0;
    var minute= 0;
    var second= 0;
    if (diff > 0) {
        flag = -1;
    } else if (diff ==0) {
        flag = 0;
    }else {
        flag = 1;
        diff = Math.abs(diff);
    }
    if (diff >= 24*60*60) {
        day = Math.floor(diff/(24*60*60));
        diff= diff- day*(24*60*60);
    }

    if (diff >= 3600) {
        hour = Math.floor(diff/3600);
        diff = diff-hour*3600;
    }
    if (diff >= 60) {
        minute = Math.floor(diff/60);
        diff = diff-minute*60;
    }
    if (diff<60) {
        second = diff;
    }
    var status = '';
    if (flag==-1)  {
        status = '已经过去';
    }else {
        status = '还有'
    }
    if (day < 10) {
        day = addZero(day);
    }
    if (hour < 10) {
        hour = addZero(hour);
    }
    if (minute < 10) {
        minute = addZero(minute);
    }
    if (second < 10) {
        second = addZero(second);
    }
    var time = '现在距离'+geshi(last)+status+day+'天'+hour+'小时'+minute+'分'+second+'秒';
    var p = document.getElementById(id);
    p.textContent = time;
}
    year();
    month();
    day();
    hour();
    minute();
    second();
var time = document.getElementById("time");
time.textContent = geshi(chooseTime());
var id = setInterval(function () {
    distance(new Date().getTime(), chooseTime(), 'result-wrapper');
},1000);
document.getElementById("year-select").onchange = function() {
  day();
};
document.getElementById("month-select").onchange = function() {
  day();
};
document.getElementById("wrapper").onchange = function() {
    clearInterval(id);
    time.textContent = geshi(chooseTime());
    id = setInterval(function () {
        distance(new Date().getTime(), chooseTime(), 'result-wrapper');
    },1000);
};
