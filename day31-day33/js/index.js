function getData() {
    var regSelect = document.getElementById("region-select");
    var regions = regSelect.querySelectorAll("option");
    var region;
    for (let i=0; i<regions.length; i++) {
        if (regions[i].selected){
            region = regions[i];
        }
    }
    var  regValue = region.value;
    var proSelect = document.getElementById("product-select");
    var products  = proSelect.querySelectorAll("option");
    var product;
    for (let i=0; i<products.length; i++) {
        if (products[i].selected){
            product = products[i];
        }
    }
    var proValue = product.value;
    var  arr = [];
    for (let i=0; i<sourceData.length; i++) {
        if (sourceData[i].region==regValue && sourceData[i].product == proValue) {
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
    // 给容器做一个事件委托 = function() {
    //     if 是checkbox
    //         读取自定义属性
    //     if 全选
    //         做全选对应的逻辑
    //     else
    //         做子选项对应的逻辑
    // }
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
document.getElementById("region-select").onchange = function() {
    rendering(getData());
};
document.getElementById("product-select").onchange = function() {
    rendering(getData());
};