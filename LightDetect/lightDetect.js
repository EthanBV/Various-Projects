var tri1 = [100,100];
var tri2 = [200,300];
var tri3 = [100,600];
var point = [300,300];
var gameScreen;
function onLaunch(){
    gameScreen = document.createElement("CANVAS");
    gameScreen.id = "gameScreen";
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "black";
    document.body.appendChild(gameScreen);
    var ctx=gameScreen.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(tri1[0],tri1[1]);
    ctx.lineTo(tri2[0],tri2[1]);
    ctx.lineTo(tri3[0],tri3[1]);
    ctx.lineTo(tri1[0],tri1[1]);
    ctx.strokeStyle="rgba(150,200,256,1)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(point[0],point[1]);
    ctx.lineTo(point[0]+1,point[1]);
    ctx.strokeStyle="rgba(150,200,256,1)";
    ctx.lineWidth = 1;
    ctx.stroke();
}

onLaunch();