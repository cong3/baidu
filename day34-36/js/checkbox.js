function createCheckBox(id, obj ) {
    var wrapper = document.getElementById(id);
    var one = document.createElement("input");
    one.type = 'checkbox';
    one.setAttribute("checkbox-type","all");
    wrapper.appendChild(one);
    var text = document.createTextNode("全选");
    wrapper.appendChild(text);
    for (let i=0; i<obj.length; i++) {
        var input = document.createElement("input");
        input.type = 'checkbox';
        input.setAttribute("checkbox-type","zi");
        input.value = obj[i].value;
        wrapper.appendChild(input);
        var text = document.createTextNode(obj[i].text);
        wrapper.appendChild(text);
    }
    wrapper.addEventListener("click" ,function (e) {
        var target = e.target;
        if (target.nodeName.toLowerCase() == 'input' && target.type == 'checkbox') {
            var attr = target.getAttribute("checkbox-type");
            if (attr == 'all') {
                var parent = target.parentNode;
                var inputs = parent.querySelectorAll("input");
                for (var i=0; i<inputs.length; i++) {
                    if (!inputs[i].checked) {
                        inputs[i].checked = true;
                    }
                }
            }else {
                var parent = target.parentNode;
                var inputs = parent.querySelectorAll("input");
                var all = '';
                var isAllChecked = 1;   // 假设都是选中

                for (var i=inputs.length-1; i>=0; i--) {
                    if (inputs[i].getAttribute("checkbox-type") == 'all') {
                        all = inputs[i];
                    }else {
                        if (!inputs[i].checked) {
                            isAllChecked =0;
                        }
                    }
                }
                if (isAllChecked) {
                    all.checked = true;
                }else {
                    all.checked = false;
                }

            }
        }

    })
}