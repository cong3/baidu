// 创建复选框
createCheckBox('region-radio-wrapper', [{
    value: "华北",
    text: "华北"
}, {
    value:"华南",
    text: "华南"
},{
    value: "华东",
    text: "华东"
}]);

createCheckBox('product-radio-wrapper', [{
    value: "手机",
    text: "手机"
}, {
    value: "笔记本",
    text: "笔记本"
},{
    value: "智能音箱",
    text: "智能音箱"
}]);

if (history.pushState) {
    window.addEventListener("popstate", function() {
        fnHashTrigger();
        rendering(getData());
        zLine.setData(getData());
    });
    fnHashTrigger();
    rendering(getData());
    zLine.setData(getData());

    // 默认载入

}
document.getElementById("region-radio-wrapper").onclick = function() {
    rendering(getData());
    resolveUrl();
    zLine.setData(getData());
};
document.getElementById("product-radio-wrapper").onclick = function() {
    resolveUrl();
    rendering(getData());
    zLine.setData(getData());
};
// 监视表格
document.getElementById("table-wrapper").onmouseover = function (e) {
    var target = e.target;
    if (target.tagName.toLowerCase() == 'td') {
        var tr = target.parentNode;
        if (tr.getAttribute("type") == 'body') {
            var tds = tr.querySelectorAll("td");
            var data = {};
            data.region = tr.getAttribute("region");
            data.product= tr.getAttribute("product");
            data.sale = [];
            for (let i=0; i<tds.length; i++) {
                var number = Number(tds[i].innerHTML);
                if (!isNaN(number)) {
                    data.sale.push(number);
                }
            }
            bar.setData([data]);
            zLine.setData([data]);
        }
    }
};
document.getElementById("table-wrapper").onmouseleave = function (e) {
    document.getElementById("draw-svg").innerHTML = '';
    zLine.setData(getData());
};

