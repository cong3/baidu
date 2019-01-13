var zLine = {
    data:[],
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    wHeight:300,
    wWidth:600,
    x:600,
    y:300,
    zColor:'#333333',
//  定义好每一个数据点的直径，颜色，线的颜色，宽度
    dotDia:5,
    dColor:'#333333',
    lColor:'#60acfc',
    lWidth:0,
//  定义多个颜色
    fulColor:['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7',
    '#DC143C','#00FF00','#FF0000','#00BFFF','#BA55D3','#8A2BE2',
    ],
// 定义好没两个数据点之间的横向间隔距离
    dInter:40,
    drawBrokenLine:function () {
    var data = this.data;
    var cW = document.getElementById("draw-canvas");
    cW.innerHTML = '';
    // 拿到折线图中的最大值Max
    var max = getMax(data);
    // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    var bi = max / this.y;
    // 绘制横轴及纵轴
    var c = document.createElement("canvas");
    c.id = "my-canvas";
    c.width = this.wWidth;
    c.height = this.wHeight;
    var ctx = c.getContext("2d");
    // 绘制x轴
    ctx.beginPath();
    ctx.moveTo(0,this.y);
    ctx.lineTo(this.x,this.y);
    ctx.strokeStyle = this.zColor;
    ctx.lineWidth= 2;
    ctx.stroke();
    ctx.closePath();
    // 绘制y轴
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,this.y);
    ctx.strokeStyle = this.zColor;
    ctx.lineWidth= 2;
    ctx.stroke();
    ctx.closePath();
    for (let i=0; i<data.length; i++) {
        var last = {
            'x':0,
            'y':0,
        };
        // 生成颜色
        this.lColor = this.fulColor[i];
        ctx.beginPath();
        ctx.arc(520,20*(i+1),2,0,2*Math.PI);
        ctx.strokeStyle = this.lColor;
        ctx.stroke();
        ctx.closePath();
        // 文字
        ctx.beginPath();
        ctx.fillStyle = this.lColor;
        ctx.fillText(data[i].region+'-'+data[i].product,525,20*(i+1)+2);
        ctx.closePath();
        for (let j=0; j<data[i].sale.length; j++) {
            let dh = data[i]['sale'][j]/bi;
            let dx = this.dInter*(j+1);
            let dy = this.y-dh;
            // 开始绘制点
            ctx.beginPath();
            ctx.arc(dx,dy,this.dotDia/2,0,2*Math.PI);
            ctx.strokeStyle = this.dColor;
            ctx.stroke();
            ctx.closePath();
            if (j !=0) {
                ctx.beginPath();
                ctx.moveTo(last.x,last.y);
                ctx.lineTo(dx,dy);
                ctx.strokeStyle = this.lColor;
                ctx.lineWidth = this.lWidth;
                ctx.stroke();
                ctx.closePath();
            }
            last.x = dx;
            last.y = dy;
        }
    }
    cW.appendChild(c);
},
    setData:function (data) {
        console.log(data);
        this.data = data;
        this.drawBrokenLine();
    }
};
