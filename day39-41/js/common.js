function getMax(data) {
    var arr = [];
    for (let i=0; i<data.length; i++) {
        var temp = [];
        for (let j=0; j<data[i].sale.length; j++) {
            temp.push(data[i].sale[j]);
        }
        arr.push(temp.sort((a,b)=> a-b)[temp.length-1]);
    }
    var max =  arr.sort((a,b)=> a-b)[arr.length-1];
    return max;
}