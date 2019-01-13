function drawCanvas() {
    var wrapper = document.getElementById("wrapper-canvas");
    var canvas  = document.createElement("canvas");
    canvas.id = "my-canvas";
    canvas.width = 800;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    // 画一条直线
    ctx.moveTo(0,0);
    ctx.lineTo(300,0);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    // 画一个矩形
    ctx.beginPath();
    ctx.rect(20,20,150,100);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    // 画原圆形
    ctx.beginPath();
    ctx.arc(100,200,50,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    // 一些文字
    ctx.beginPath();
    ctx.font = '45px Arial';
    ctx.strokeText("Hello World!",10,290);
    // 一个时钟
    ctx.beginPath();
    ctx.arc(250,200,50,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.font = '10px Arial';
    ctx.strokeText("1",268,175);
    ctx.strokeText("2",280,185);
    ctx.strokeText("3",288,200);
    ctx.strokeText("4",285,225);
    ctx.strokeText("5",268,240);
    ctx.strokeText("6",245,245);
    ctx.strokeText("7",225,240);
    ctx.strokeText("8",210,220);
    ctx.strokeText("9",205,200);
    ctx.strokeText("10",205,185);
    ctx.strokeText("11",220,175);
    ctx.strokeText("12",240,170);
    ctx.closePath();
    ctx.moveTo(250,200);
    ctx.lineTo(275,200);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
    ctx.moveTo(250,200);
    ctx.lineTo(250,225);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.moveTo(250,200);
    ctx.lineTo(250,165);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    // 一朵云
    ctx.beginPath();
    ctx.moveTo(200,50);
    ctx.bezierCurveTo(200,50,160,95,250,80);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(180,70);
    ctx.bezierCurveTo(180,70,250,10,310,30);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(280,40);
    ctx.bezierCurveTo(280,40,350,20,330,50);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(230,60);
    ctx.bezierCurveTo(240,60,250,120,330,40);
    ctx.stroke();
    ctx.closePath();
    wrapper.appendChild(canvas);

}
drawCanvas();