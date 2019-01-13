function rendering(data) {
    var wrapper = document.getElementById("table-wrapper");
    var table = document.createElement("table");
    // thead
    var head = document.createElement("thead");
    var hTr = document.createElement("tr");

    var tShop = document.createElement("th");
    var tRegion = document.createElement("th");
    tShop.innerHTML = '商品';
    tRegion.innerHTML = '地区';

    // 判断当前选择情况
    var regSelect = document.getElementById("region-radio-wrapper");
    var regions = regSelect.querySelectorAll("input");
    var proSelect = document.getElementById("product-radio-wrapper");
    var products  = proSelect.querySelectorAll("input");
    var regNum = 0;
    var proNum = 0;
    for (let i=0; i<regions.length; i++) {
        if (regions[i].checked == true && regions[i].getAttribute("checkbox-type") != 'all')  {
            regNum++;
        }
    }
    for (let i=0; i<products.length; i++) {
        if (products[i].checked == true && products[i].getAttribute("checkbox-type") != 'all')  {
            proNum++;
        }
    }
    var isRegFirst = 0;
    if (regNum == 1 && proNum > 1) {
        isRegFirst =1;
    }
    if (isRegFirst ==1) {
        hTr.appendChild(tRegion);
        hTr.appendChild(tShop);
    }else {
        hTr.appendChild(tShop);
        hTr.appendChild(tRegion);
    }

    for (let i=1; i<=12; i++) {
        var th = document.createElement("th");
        th.innerHTML = i+'月';
        hTr.appendChild(th);
    }
    head.appendChild(hTr);
    // tbody
    var body = document.createElement("tbody");
    var regionArr = [];
    var productArr= [];
    for (let i=0; i <data.length; i++) {
        if (regionArr.length == 0) {
            var arr = [];
            arr.push(data[i]);
            regionArr.push(arr)
        }else {
            for (let j=0;j<regionArr.length; j++) {
                if (regionArr[j][0].region == data[i].region) {
                    regionArr[j].push(data[i]);
                    break;
                }else {
                    if (j == regionArr.length-1) {
                        var arr = [];
                        arr.push(data[i]);
                        regionArr.push(arr);
                        break;
                    }
                }
            }
       }
        if (productArr.length == 0) {
            var arr = [];
            arr.push(data[i]);
            productArr.push(arr)
        }else {
            for (let j=0;j<productArr.length; j++) {
                if (productArr[j][0].product == data[i].product) {
                    productArr[j].push(data[i]);
                    break;
                }else {
                    if (j == productArr.length-1) {
                        var arr = [];
                        arr.push(data[i]);
                        productArr.push(arr);
                        break;
                    }
                }

            }
        }
    }
    var tableData;
    if (isRegFirst == 1) {
        tableData = regionArr;
    }else {
        tableData = productArr;
    }

    for (let i=0; i<tableData.length; i++) {
        for (let j=0; j<tableData[i].length; j++) {
            var tr = document.createElement("tr");
            var bPro = document.createElement("td");
            bPro.innerHTML = tableData[i][j].product;
            var breg = document.createElement("td");
            breg.innerHTML = tableData[i][j].region;
            tr.setAttribute("product",tableData[i][j].product);
            tr.setAttribute("region",tableData[i][j].region);
            tr.setAttribute("type","body");
            // 合并
            if ( j==0) {
                if (isRegFirst == 1) {
                    breg.rowSpan = tableData[i].length;
                    tr.appendChild(breg);
                    tr.appendChild(bPro);
                } else {
                    bPro.rowSpan = tableData[i].length;
                    tr.appendChild(bPro);
                    tr.appendChild(breg);
                }
            }else {
                if (isRegFirst == 1) {
                    tr.appendChild(bPro);
                } else {
                    tr.appendChild(breg);
                }
            }
            // 渲染数字
            for (let k=0; k<tableData[i][j].sale.length; k++) {
                var td = document.createElement("td");
                // 增加input输入框
                // var input = document.createElement("input");
                // input.type = "text";
                // input.value = tableData[i][j].sale[k];
                td.innerHTML = tableData[i][j].sale[k];
                td.className = 'pencil';
                td.setAttribute("is-edit",0);
                // td.appendChild(input);
                td.addEventListener("click",edit);
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
    }
    // 渲染
    table.appendChild(head);
    table.appendChild(body);
    wrapper.innerHTML = '';
    wrapper.appendChild(table);
}