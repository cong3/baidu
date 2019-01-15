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
    var regionValues = [];
    for (let i=0; i<regions.length; i++) {
        if (regions[i].checked && regions[i].getAttribute("checkbox-type") != 'all'){
            regionValues.push(regions[i].value);
        }
    }
    var proSelect = document.getElementById("product-radio-wrapper");
    var products  = proSelect.querySelectorAll("input");
    var productValues= [];
    for (let i=0; i<products.length; i++) {
        if (products[i].checked && products[i].getAttribute("checkbox-type") != 'all'){
            productValues.push(products[i].value);
        }
    }
    var  arr = [];
    for (let i=0; i<data.length; i++) {
        if (regionValues.indexOf(data[i].region) != -1 && productValues.indexOf(data[i].product) != -1) {
            arr.push(data[i]);
        }
    }
    return arr;
}


