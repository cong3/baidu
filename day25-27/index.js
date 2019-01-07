var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
// 获取用户输入
function getText() {
    var input = document.getElementById("email-input");
    var value = input.value;
    return value.trim();
}
// 追加列表
function addLi() {
    var value = getText();
    var ul = document.getElementById("email-sug-wrapper");
    ul.innerHTML = '';
    for (let i=0; length = postfixList.length, i<length; i++) {
        var li = document.createElement("li");
        li.textContent = value+postfixList[i];
        ul.appendChild(li);
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
addLi();
isHide();
document.getElementById("email-input").onkeyup = function (e) {
    addLi();
    isHide();
};