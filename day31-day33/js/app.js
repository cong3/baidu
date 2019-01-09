// 创建复选框
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