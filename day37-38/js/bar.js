var bar = {
    data:[],
    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    wraHeight:300,
    wraWidth:600,
    x:600,
    y:300,
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    cWidth:20,
    cInter:30,
// 定义好柱子颜色，轴的颜色
    ziColor:'#60acfc',
    zoColor:'#333333',
    drawColumn:function() {
        var data = this.data;
        var cl = document.getElementById("draw-svg");
        cl.innerHTML = '';
        // 拿到柱状图中的最大值Max
        var max = getMax(data);
        //根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
        var bi = max / this.y;
        // 绘制横轴及纵轴
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("version","1.1");
        svg.setAttribute("width",this.wraWidth);
        svg.setAttribute("height",this.wraHeight);
        var xLine = '<line x1="0" y1="'+this.y+'" x2="'+this.x+'" y2="'+this.y+'"style="stroke:'+this.zoColor+';stroke-width:2"/>';
        var yLine = '<line x1="0" y1="0" x2="0" y2="'+this.y+'"style="stroke:'+this.zoColor+'; stroke-width:4"/>';
        svg.innerHTML = xLine+yLine;

        for (let i=0; i<data.length; i++) {
            var zStr = '';
            for (let j=0; j<data[i].sale.length
                ; j++) {
                let zh = data[i]['sale'][j]/bi;
                let zw = this.cWidth;
                let zx = this.cInter*(j+1)+j*this.cWidth;
                let zy = this.y-zh;
                zStr+='<rect x="'+zx+'" y="'+zy+'" width="'+zw+'" height="'+zh+'" style="fill:'+this.ziColor+';stroke-width:0;stroke:rgb(0,0,0)"/>'
            }
        }
        svg.innerHTML += zStr;
        cl.appendChild(svg);
    },
    setData:function (data) {
        this.data = data;
        this.drawColumn();
    }
};

