function local() {
    var table = document.getElementById("table-wrapper");
    var body = table.querySelector("tbody");
    var tr = body.querySelectorAll("tr");
    var data = [];
    for(let i=0; i<tr.length; i++) {
        var obj = {};
        obj.product = tr[i].getAttribute("product");
        obj.region  = tr[i].getAttribute("region");
        obj.sale = [];
        var tds = tr[i].querySelectorAll("td");
        for (let j=0; j<tds.length; j++){
            if (!isNaN(Number(tds[j].textContent))){
                obj.sale.push(tds[j].textContent);
            }
        }
        data.push(obj);
    }
    // 更新本地数据
    var myStorage = localStorage;
    myStorage.sourceData = JSON.stringify(data);
}