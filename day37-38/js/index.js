function getData() {
    var myStorage = localStorage;
    // myStorage.clear();
    var data;
    if (myStorage.sourceData != undefined) {
        data = JSON.parse(myStorage.sourceData);
    }else {
        data = sourceData;
        myStorage.sourceData = JSON.stringify(data);
    }
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
    var  arr = [];
    for (let i=0; i<data.length; i++) {
        if (regionValues.indexOf(data[i].region) != -1 && productValues.indexOf(data[i].product) != -1) {
            arr.push(data[i]);
        }
    }
    return arr;
}


