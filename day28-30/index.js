// 增加一个变量，用于存储当前选中的提示Li的序号
var nowSelectTipIndex = 1;
// 转码
function htmlEncode(text) {
    var div = document.createElement("div");
    div.textContent = text;
    var output = div.innerHTML;
    div = null;
    return output;
}
// 解码
function htmlDecode(text) {
    var div = document.createElement("div");
    div.innerHTML = text;
    var output = div.textContent;
    div = null;
    return output;
}

var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
// 获取用户输入
function getText() {
    var input = document.getElementById("email-input");
    var value = input.value;
    return value.trim();
}
// 生成追加内容
function create() {
    var value = getText();
    var index = value.indexOf('@');
    var last  = '';
    if (index != -1) {
        last  = value.slice(index+1);
        value = value.slice(0,index);
    }
    var arr = [];
    var all = [];
    for (let i=0; length = postfixList.length, i<length; i++) {
        if (last != '') {
            var isIndex = postfixList[i].indexOf(last);
            if (isIndex==0) {
                var li = document.createElement("li");
                li.textContent = value+'@'+postfixList[i];
                arr.push(li);
            }
        }
        var li = document.createElement("li");
        li.innerHTML = htmlEncode(value+'@'+postfixList[i]);
        all.push(li)
    }
    var res;
    if (arr.length != 0) {
        res = arr;
    } else {
        res = all;
    }
    if (nowSelectTipIndex>0) {
        res[nowSelectTipIndex-1].className = 'used';
    }
    return res;
}
//
function addLi() {
    var ul = document.getElementById("email-sug-wrapper");
    ul.innerHTML = '';
    var lis = create();
    for (let i=0; i<lis.length; i++) {
        ul.appendChild(lis[i]);
    }
}
// 是否隐藏
function isHide() {
    var  value = getText();
    if (value == '') {
        hide();
    }else {
        show();
    }
}
// 隐藏
function hide() {
    var ul = document.getElementById("email-sug-wrapper");
    ul.style.display = 'none';
}
// 显示
function show() {
    var ul = document.getElementById("email-sug-wrapper");
    ul.style.display = 'block';
}
// 重置选中状态
// function resetClass() {
//     var ul = document.getElementById("email-sug-wrapper");
//     var lis = ul.querySelectorAll("li");
//     for (let i=0; i<lis.length; i++) {
//         if (i==0) {
//             lis[i].className = 'used';
//         }else {
//             if (lis[i].className == 'used') {
//                 lis[i].className = '';
//             }
//         }
//     }
// }

addLi();
isHide();
document.getElementById("email-input").onkeyup = function (e) {
    var code = e.code;
    if(code !='ArrowUp' && code != 'ArrowDown' && code != 'Enter') {
        resetClass();
    }
    if (code != 'Enter') {
        addLi();
        isHide();
    }
};
document.getElementById("email-sug-wrapper").onclick = function (e) {
    var target = e.target;
    if (target.tagName.toLowerCase() == 'li') {
        var value = target.textContent;
        var input = document.getElementById("email-input");
        input.value = htmlDecode(value);
        hide();
    }
};
// 方法1
// 监听特殊3个键的键盘事件，这个事件可能就是inputDom的输入监听，也有可能是另外一个，请自己测试后判断
// window.onkeydown = function(e) {
//     var code = e.code;
//     console.log(code);
//     var ul = document.getElementById("email-sug-wrapper");
//     var lis = ul.querySelectorAll("li");
//     var index = 0;
//     var length = lis.length
//     for (let i=0; i<length; i++) {
//         if (lis[i].className == 'used') {
//             index = i;
//         }
//     }
//     if (code == 'ArrowUp') {
//         if (index !=0) {
//             lis[index].className = '';
//             lis[index-1].className = 'used';
//         } else {
//             lis[index].className = '';
//             lis[length-1].className = 'used';
//         }
//     }
//
//     if (code == 'ArrowDown') {
//         if (index !=length-1) {
//             lis[index].className = '';
//             lis[index+1].className = 'used';
//         } else {
//             lis[index].className = '';
//             lis[0].className = 'used';
//         }
//     }
//
//     if (code == 'Enter') {
//         lis[index].className = '';
//         var value = lis[index].textContent;
//         var input = document.getElementById("email-input");
//         input.value = htmlDecode(value);
//         hide();
//     }
// }

// 方法2


// 需要修改一下之前的inputDom的输入监听


function resetClass() {
    nowSelectTipIndex = 1;
}

// 监听特殊3个键的键盘事件，这个事件可能就是inputDom的输入监听，也有可能是另外一个，请自己测试后判断
window.onkeydown = function(e) {
    var code = e.code;
    var ul = document.getElementById("email-sug-wrapper");
    var lis = ul.querySelectorAll("li");
    var length = lis.length
        if (code == 'ArrowUp') {
        if (nowSelectTipIndex !=1) {
            nowSelectTipIndex-=1;
        } else {
            nowSelectTipIndex=length;
        }
    }

    if (code == 'ArrowDown') {
        if (nowSelectTipIndex !=length) {
            nowSelectTipIndex+=1;
        } else {
            nowSelectTipIndex=1;
        }
    }

    if (code == 'Enter') {
        var value = lis[nowSelectTipIndex-1].textContent;
        var input = document.getElementById("email-input");
        input.value = htmlDecode(value);
        hide();
    }
};
