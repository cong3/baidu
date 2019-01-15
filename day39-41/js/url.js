function resolveUrl() {
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
    var regionStr = regionValues.join(',');
    var productStr= productValues.join(',');
    var str = '?region='+regionStr+'&'+'product='+productStr;
    history.pushState(null, null, str);
    console.log(history.state);
}

var fnHashTrigger = function(target) {
    var query = decodeURI(location.href.split("?")[1]);
    if (typeof query == "undefined") {

    } else {
        var arr = query.split('&');
        var regSelect = document.getElementById("region-radio-wrapper");
        var proSelect = document.getElementById("product-radio-wrapper");
        var region = regSelect.querySelectorAll("input");
        var product = proSelect.querySelectorAll("input");
        for (let i=0; i<arr.length; i++) {
            var type = arr[i].split('=');
            if (type[0] == 'region') {
                var reginoArr = type[1].split(',');
                if (reginoArr.length==3) {
                    for (let j=0; j<region.length; j++) {
                        region[j].checked = true;
                    }
                }else {
                    for (let j=0; j<region.length; j++) {
                        if (region[j].getAttribute("checkbox-type") != 'all') {
                            let value = region[j].getAttribute("value");
                            if (reginoArr.indexOf(value) != -1) {
                                region[j].checked = true;
                            }
                        }
                    }
                }

            }  else if (type[0] == 'product') {
                var productArr = type[1].split(',');
                if (productArr.length==3) {
                    for (let j=0; j<product.length; j++) {
                        product[j].checked = true;
                    }
                }else {
                    for (let j=0; j<product.length; j++) {
                        if (product[j].getAttribute("checkbox-type") != 'all') {
                            let value = product[j].getAttribute("value");
                            if (productArr.indexOf(value) != -1) {
                                product[j].checked = true;
                            }
                        }
                    }
                }

            }
        }

    }
};
