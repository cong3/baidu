function edit(e) {
    var target = e.target;
    if (target.tagName.toLowerCase() == 'td') {
        target.className = '';
        var isEdit  = target.getAttribute("is-edit");
        if (isEdit == 1) {
            return;
        }else {
            var parent = target.parentNode.parentNode;
            var tds = parent.querySelectorAll("td");
            for (let i=0; i<tds.length; i++) {
                if (tds[i].getAttribute("is-edit")==1) {
                    alert("请完成当前编辑");
                    return;
                }
            }
        }
        target.setAttribute("is-edit",1);
        var value = target.textContent;
        var input = document.createElement("input");
        input.value = value;
        input.setAttribute("last-value",value);
        var button1 = document.createElement("button");
        button1.innerText = '确定';
        button1.addEventListener("click",submit);
        var button2 = document.createElement("button");
        button2.innerText = '取消';
        button2.addEventListener("click",cancel);
        target.innerHTML = '';
        target.appendChild(input);
        target.appendChild(button1);
        target.appendChild(button2);
    }
}
function submit() {
    var td = this.parentNode;
    var input = td.querySelector("input");
    var value = input.value;
    if (isNaN(value)) {
        alert("请输入正确的数字");
        return;
    }
    td.innerHTML = value;
    td.setAttribute("is-edit",0);
    td.className = 'pencil';
    // 重新渲染
    local();
    rendering(getData());
    zLine.setData(getData());
}
function cancel(e) {
    var td = this.parentNode;
    var input = td.querySelector("input");
    console.log(input);
    td.innerHTML = input.getAttribute("last-value");
    td.setAttribute("is-edit",0);
    td.className = 'pencil';
}