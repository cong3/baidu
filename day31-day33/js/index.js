function getData() {
    var regSelect = document.getElementById("region-radio-wrapper");
    var regions = regSelect.querySelectorAll("input");
    var regionArr = [];
    for (let i=0; i<regions.length; i++) {
        if (regions[i].checked && regions[i].getAttribute("checkbox-type") != 'all'){
            regionArr.push(regions[i].value);
        }
    }
    var proSelect = document.getElementById("product-radio-wrapper");
    var products  = proSelect.querySelectorAll("input");
    var productArr= [];
    for (let i=0; i<products.length; i++) {
        if (products[i].checked && products[i].getAttribute("checkbox-type") != 'all'){
            productArr.push(products[i].value);
        }
    }
    var regionValues = [];
    var productValues= [];
    if (regionArr.indexOf('1') != -1) {
        regionValues.push('华北');
    }
    if (regionArr.indexOf('2') != -1) {
        regionValues.push('华南');
    }
    if (regionArr.indexOf('3') != -1) {
        regionValues.push('华东');
    }
    if (productArr.indexOf('1') != -1) {
        productValues.push('手机');
    }
    if (productArr.indexOf('2') != -1) {
        productValues.push('笔记本');
    }
    if (productArr.indexOf('3') != -1) {
        productValues.push('智能音箱');
    }
    console.log(regionArr);
    console.log(regionValues);
    console.log(productArr);
    console.log(productValues);
    var  arr = [];
    for (let i=0; i<sourceData.length; i++) {
        if (regionValues.indexOf(sourceData[i].region) != -1 && productValues.indexOf(sourceData[i].product) != -1) {
            arr.push(sourceData[i]);
        }
    }
    return arr;
}

function rendering(data) {
    var wrapper = document.getElementById("table-wrapper");
    var table = document.createElement("table");
    // thead
    var head = document.createElement("thead");
    var hTr = document.createElement("tr");

    var tShop = document.createElement("td");
    var tRegion = document.createElement("td");
    tShop.innerHTML = '商品';
    tRegion.innerHTML = '地区';
    hTr.appendChild(tShop);
    hTr.appendChild(tRegion);
    for (let i=1; i<=12; i++) {
        var td = document.createElement("td");
        td.innerHTML = i+'月';
        hTr.appendChild(td);
    }
    head.appendChild(hTr);
    // tbody
    var body = document.createElement("tbody");
    for (let i=0; i<data.length; i++) {
        var tr = document.createElement("tr");
        var bPro = document.createElement("td");
        bPro.innerHTML = data[i].product;
        var breg = document.createElement("td");
        breg.innerHTML = data[i].region;
        tr.appendChild(bPro);
        tr.appendChild(breg);
        for (let j=0; j<data[i].sale.length; j++) {
            var td = document.createElement("td");
            td.innerHTML = data[i].sale[j];
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
    // 渲染
    table.appendChild(head);
    table.appendChild(body);
    wrapper.innerHTML = '';
    wrapper.appendChild(table);
}
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

// 对象或数组自己根据喜好实现均可
createCheckBox('region-radio-wrapper', [{
    value: 1,
    text: "华北"
}, {
    value: 2,
    text: "华南"
},{
    value: 3,
    text: "华东"
}]);

createCheckBox('product-radio-wrapper', [{
    value: 1,
    text: "手机"
}, {
    value: 2,
    text: "笔记本"
},{
    value: 3,
    text: "智能音箱"
}]);


rendering(getData());
document.getElementById("region-radio-wrapper").onclick = function() {
    rendering(getData());
};
document.getElementById("product-radio-wrapper").onclick = function() {
    rendering(getData());
};