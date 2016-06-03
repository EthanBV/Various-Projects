var lights = [
    /*[x,y,strength]*/
    [150,600,3000],
    [650,300,1000],
//     [250,600,1000],
//     [250,600,1000],
//     [250,600,1000],
];
var walls = [
    /*[Bottom Left x, Bottom Left y, Top Right x, Top Right y]*/
    [600,300,30,90],
    [600,200,120,30],
    [150,500,60,60],
    [350,500,60,60],
    [950,400,60,60],
];

var gameScreen;
var lightMap;
var cursorX;
var cursorY;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
function onLaunch(){
    lightMap = document.createElement("CANVAS");
    lightMap.id = "lightMap";
    lightMap.style.position = "absolute";
    lightMap.style.left = "0px";
    lightMap.style.top = "0px";
    lightMap.width = window.innerWidth;
    lightMap.height = window.innerHeight;
    lightMap.style.backgroundColor = "transparent";
    lightMap.style.webkitFilter = "blur(20px)";
    gameScreen = document.createElement("CANVAS");
    gameScreen.id = "gameScreen";
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "black";
    gameScreen.style.webkitFilter = "blur(0px)";
    document.body.appendChild(gameScreen);
    document.body.appendChild(lightMap);
    for(i=25;i>0;i--)makeBlock();
}

function makeBlock(){
    walls.push([Math.floor(Math.random()*gameScreen.width),Math.floor(Math.random()*gameScreen.height),Math.floor(Math.random()*60+30),Math.floor(Math.random()*60+30)]);
}

function findEndPosition(x,y,angle,str){
    var slope = (Math.sin(angle/180*Math.PI)/Math.cos(angle/180*Math.PI));
    var yI = y-x*slope;
    var dirI = (angle<180)?"down":"up"
    var dirII = (angle>90 && angle<270)?"left":"right";
    var XoI;
    var YoI;
    var finalPos = [Math.cos(angle/180*Math.PI)*str+x,Math.sin(angle/180*Math.PI)*str+y];
    for(o=walls.length-1;o>-1;o--){
        var wallDirI = "none";
        if(walls[o][1]>y)wallDirI="bottom";
        else if(walls[o][1]+walls[o][3]<y)wallDirI="top";
        var wallDirII = "none";
        if(walls[o][0]>x)wallDirII="right";
        else if(walls[o][0]+walls[o][2]<x)wallDirII="left";
        if(wallDirII==dirI || wallDirI!=dirI){
        //check top edge
        YoI = walls[o][1];
        XoI = (YoI - yI)/slope;
        if(wallDirI == "bottom" && dirI=="down" && XoI>walls[o][0] && XoI<walls[o][0]+walls[o][2] && Math.sqrt(Math.pow(x-XoI,2)+Math.pow(y-YoI,2))<Math.sqrt(Math.pow(x-finalPos[0],2)+Math.pow(y-finalPos[1],2)))finalPos = [XoI,YoI];
        //check bottom edge
        YoI = walls[o][1]+walls[o][3];
        XoI = (YoI - yI)/slope;
        if(wallDirI == "top" && dirI=="up" && XoI>walls[o][0] && XoI<walls[o][0]+walls[o][2] && Math.sqrt(Math.pow(x-XoI,2)+Math.pow(y-YoI,2))<Math.sqrt(Math.pow(x-finalPos[0],2)+Math.pow(y-finalPos[1],2)))finalPos = [XoI,YoI];
        //check left edge
        XoI = walls[o][0];
        YoI = XoI*slope+yI;
        if(wallDirII == "right" && dirII=="right" && YoI>walls[o][1] && YoI<walls[o][1]+walls[o][3] && Math.sqrt(Math.pow(x-XoI,2)+Math.pow(y-YoI,2))<Math.sqrt(Math.pow(x-finalPos[0],2)+Math.pow(y-finalPos[1],2)))finalPos = [XoI,YoI];
        //check right edge
        XoI = walls[o][0]+walls[o][2];
        YoI = XoI*slope+yI;
        if(wallDirII == "left" && dirII=="left" && YoI>walls[o][1] && YoI<walls[o][1]+walls[o][3] && Math.sqrt(Math.pow(x-XoI,2)+Math.pow(y-YoI,2))<Math.sqrt(Math.pow(x-finalPos[0],2)+Math.pow(y-finalPos[1],2)))finalPos = [XoI,YoI];
        }
    }
    return finalPos;
}

function loadMenu(){
    var menu = document.createElement("CANVAS");
    menu.id = "menu";
    menu.style.position = "absolute";
}

function updateLights(){
    lights[0][0]=cursorX;
    lights[0][1]=cursorY;
//     lights[1][0]=cursorX-20;
//     lights[1][1]=cursorY;
//     lights[2][0]=cursorX+20;
//     lights[2][1]=cursorY;
//     lights[3][0]=cursorX;
//     lights[3][1]=cursorY-20;
//     lights[4][0]=cursorX;
//     lights[4][1]=cursorY+20;
    var ctx=gameScreen.getContext("2d");
    for(i=walls.length-1;i>-1;i--){
        ctx.fillStyle = "darkblue";
        ctx.fillRect(walls[i][0],walls[i][1],walls[i][2],walls[i][3]);
        ctx.strokeStyle="blue";
        ctx.rect(walls[i][0],walls[i][1],walls[i][2],walls[i][3]);
        ctx.stroke();
    }
    var ctxLight=lightMap.getContext("2d");
    var inWall = false;
    for(i=lights.length-1;i>-1;i--){
        for(e=walls.length-1;e>-1;e--){
            if(walls[e][0]<=lights[i][0] && walls[e][0]+walls[e][2]>=lights[i][0] && walls[e][1]<=lights[i][1] && walls[e][1]+walls[e][3]>=lights[i][1])inWall=true;
        }
        
        if(!inWall){
            for(e=lights[i][2];e>0;e--){
                var angle = 360/lights[i][2]*e;
                var startPos = [lights[i][0],lights[i][1]];
                var endPos = findEndPosition(lights[i][0],lights[i][1],angle,lights[i][2])
                ctxLight.beginPath();
                ctxLight.moveTo(startPos[0],startPos[1]);
                ctxLight.lineTo(endPos[0],endPos[1]);
                ctxLight.strokeStyle="rgba(150,200,256,0.05)";
                ctxLight.lineWidth = 1;
                ctxLight.stroke();
                
            }
        }
    }
    ctxLight.beginPath();
    ctxLight.stroke();
//     ctx.drawImage(lightMap,0,0);
}



//update function
function update(){
    gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
    lightMap.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
    updateLights();
    window.requestAnimationFrame(update);

}
window.requestAnimationFrame(update);

onLaunch();