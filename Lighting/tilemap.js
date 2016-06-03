var tilemap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var lights = [
    /*[x,y,strength,r,g,b]*/
    [150, 150, 40, 0, 0, 0],
    [220, 100, 40, 0, 0, 0],
    [220, 300, 40, 0, 0, 0],
];
var objs = [
    [150, 215, 15, 15, "dark"]
]
var lightEdges = [];
var walls = [];
var height = 15;
var width = 15;
var tileSize = 40;
var gameScreen;
var lightMap;
var cursorX;
var cursorY;

var corners = [];
var lightpoints = [];

document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
}

function onLaunch() {
    gameScreen = document.createElement("CANVAS");
    gameScreen.id = "gameScreen";
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "rgba(0,0,0,1)";
    document.body.appendChild(gameScreen);
    lightMap = document.createElement("CANVAS");
    lightMap.id = "lightMap";
    lightMap.style.position = "absolute";
    lightMap.style.left = "0px";
    lightMap.style.top = "0px";
    lightMap.width = window.innerWidth;
    lightMap.height = window.innerHeight;
    lightMap.style.backgroundColor = "rgba(255,255,255,0)";
    lightMap.style.opacity = "1"
//     lightMap.style.webkitFilter = "blur(5px)";
    document.body.appendChild(lightMap);
}

function renderTilemap() {
    var ctx = gameScreen.getContext("2d");
    walls = [];
    for(i = height - 1; i > -1; i--) {
        for(e = width - 1; e > -1; e--) {
            var image = document.createElement("IMG");
            image.src = (tilemap[i][e] == 1) ? "http://i.imgur.com/nQeAo1v.png" : "http://i.imgur.com/fZURsgE.png";
            ctx.drawImage(image, e * tileSize, i * tileSize, tileSize, tileSize);
            //             ctx.fillStyle = (tilemap[i][e]==1)?"rgba(255,255,255,1)":"rgba(255,0,0,1)";
            //             ctx.fillRect(e*tileSize,i*tileSize,tileSize,tileSize);
            //             ctx.stroke();
            if(tilemap[i][e] == 1) {
                if(i > 0)
                    if(tilemap[i - 1][e] != 1) walls.push(["x", (i) * tileSize, (e) * tileSize, (e + 1) * tileSize]);
                if(i < height - 1)
                    if(tilemap[i + 1][e] != 1) walls.push(["x", (i + 1) * tileSize, (e) * tileSize, (e + 1) * tileSize]);
                if(e > 0)
                    if(tilemap[i][e - 1] != 1) walls.push(["y", (e) * tileSize, (i) * tileSize, (i + 1) * tileSize]);
                if(e < width - 1)
                    if(tilemap[i][e + 1] != 1) walls.push(["y", (e + 1) * tileSize, (i) * tileSize, (i + 1) * tileSize]);
            }
        }
    }
    corners = [];
    for(i = 1; i < tilemap.length; i++){
        for(e = 1; e < tilemap[i].length; e++){
            var tileCount = 0;
            if(tilemap[i][e]==1)tileCount++;
            if(tilemap[i-1][e]==1)tileCount++;
            if(tilemap[i][e-1]==1)tileCount++;
            if(tilemap[i-1][e-1]==1)tileCount++;
            if(tileCount == 1 || tileCount == 3 || (tileCount == 2?tilemap[i][e]==tilemap[i-1][e-1]:false))corners.push([i,e]);
        }
    }
    lightpoints = [];
    for(i = 0; i < corners.length; i++){
        lightpoints.push([corners[i][1]*tileSize+1,corners[i][0]*tileSize]);
        lightpoints.push([corners[i][1]*tileSize-1,corners[i][0]*tileSize]);
        lightpoints.push([corners[i][1]*tileSize,corners[i][0]*tileSize+1]);
        lightpoints.push([corners[i][1]*tileSize,corners[i][0]*tileSize-1]);
    }
    
    for(i = 0; i < corners.length; i++){
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillRect(corners[i][1]*tileSize, corners[i][0]*tileSize,10,10);
    }
}

function findEndPosition(x, y, angle, str) {
    var slope = (Math.sin(angle / 180 * Math.PI) / Math.cos(angle / 180 * Math.PI));
    var yI = y - x * slope;
    var dirI = (angle < 180) ? "down" : "up"
    var dirII = (angle > 90 && angle < 270) ? "left" : "right";
    var wallDir;
    var XoI;
    var YoI;
    var finalPos = [Math.cos(angle / 180 * Math.PI) * str + x, Math.sin(angle / 180 * Math.PI) * str + y];
    for(o = walls.length - 1; o > -1; o--) {
        if(walls[o][0] == "x") {
            wallDir = (walls[o][1] < y) ? "up" : "down";
            if(dirI == wallDir) {
                YoI = walls[o][1];
                XoI = (YoI - yI) / slope;
                if(XoI >= walls[o][2] && XoI <= walls[o][3] && Math.sqrt(Math.pow(x - XoI, 2) + Math.pow(y - YoI, 2)) < Math.sqrt(Math.pow(x - finalPos[0], 2) + Math.pow(y - finalPos[1], 2))) finalPos = [XoI, YoI];
            }
        } else if(walls[o][0] == "y") {
            wallDir = (walls[o][1] > x) ? "right" : "left";
            if(dirII == wallDir) {
                XoI = walls[o][1];
                YoI = XoI * slope + yI;
                if(YoI >= walls[o][2] && YoI <= walls[o][3] && Math.sqrt(Math.pow(x - XoI, 2) + Math.pow(y - YoI, 2)) < Math.sqrt(Math.pow(x - finalPos[0], 2) + Math.pow(y - finalPos[1], 2))) finalPos = [XoI, YoI];
            }
        }
    }
    //     var objsEdges;
    //     for(o=objs.length-1;o>-1;o--){
    //         objsEdges = [];
    //         objsEdges.push(objs[o][1]+objs[o][3]/2);
    //     }
    return finalPos;
}

function updateLights() {
    var ctxLights = lightMap.getContext("2d");
    ctxLights.globalCompositeOperation = "lighter";
    lights[0][0] = Math.floor(cursorX);
    lights[0][1] = Math.floor(cursorY);
    var ctx = gameScreen.getContext("2d");
    lightEdges = [];
    lightMaps = [];
    darkMaps = [];
    for(i = lights.length - 1; i > -1; i--) {
        var angles = [];
        for(e = 0; e < lightpoints.length; e++){
            angles.push(Math.atan2(lightpoints[e][1]-lights[i][1],lightpoints[e][0]-lights[i][0])/Math.PI*180);
        }
        angles.sort();
        lightEdges.push([]);
//         alert(angles);
        
//         for(e = 0; e < angles.length; e++) {
//             var angle = angles[e];
//             var startPos = [lights[i][0], lights[i][1]];
//             var endPos = findEndPosition(lights[i][0], lights[i][1], angle, lights[i][2] * tileSize / 4);
//             lightEdges[lightEdges.length - 1].push(endPos);
//             //             ctx.beginPath();
//             //             ctx.moveTo(startPos[0],startPos[1]);
//             //             ctx.lineTo(endPos[0],endPos[1]);
//             //             ctx.strokeStyle="rgba(150,200,256,0.05)";
//             //             ctx.lineWidth = 1;
//             //             ctx.stroke();    
//         }
        for(e = lights[i][2] * tileSize; e > 0; e--) {
            var angle = 360 / (lights[i][2] * tileSize) * e;
            var startPos = [lights[i][0], lights[i][1]];
            var endPos = findEndPosition(lights[i][0], lights[i][1], angle, lights[i][2] * tileSize / 4);
            lightEdges[lightEdges.length - 1].push(endPos);
            //             ctx.beginPath();
            //             ctx.moveTo(startPos[0],startPos[1]);
            //             ctx.lineTo(endPos[0],endPos[1]);
            //             ctx.strokeStyle="rgba(150,200,256,0.05)";
            //             ctx.lineWidth = 1;
            //             ctx.stroke();    
        }
        var tempMap = document.createElement("CANVAS");
        tempMap.style.position = "absolute";
        tempMap.style.left = "0px";
        tempMap.style.top = "0px";
        tempMap.width = window.innerWidth;
        tempMap.height = window.innerHeight;
        tempMap.style.backgroundColor = "rgba(255,255,255,0)";
        tempMap.style.opacity = "1"
//         tempMap.style.webkitFilter = "blur(10px)";
        var ctxLightsTemp = tempMap.getContext("2d");
        var tempMapOutline = document.createElement("CANVAS");
        tempMapOutline.style.position = "absolute";
        tempMapOutline.style.left = "0px";
        tempMapOutline.style.top = "0px";
        tempMapOutline.width = window.innerWidth;
        tempMapOutline.height = window.innerHeight;
        tempMapOutline.style.backgroundColor = "rgba(255,255,255,0)";
        tempMapOutline.style.opacity = "1"
//         tempMapOutline.style.webkitFilter = "blur(10px)";
        var ctxOutlineTemp = tempMapOutline.getContext("2d");
        ctxLightsTemp.beginPath();
        //     var grd=ctxLights.createRadialGradient(100,100,5,100,100,100);
        try {
            var grd = ctxLightsTemp.createRadialGradient(lights[i][0], lights[i][1], 5, lights[i][0], lights[i][1], lights[i][2] * tileSize / 4);
        } catch(e) {
            var grd = ctxLightsTemp.createRadialGradient(0, 0, 0, 0, 0, 0);
        }
        grd.addColorStop(0, "rgba(" + 0 + "," + 0 + "," + 0 + ",1)");
        for(e = 1; e < 10; e++) {
            //         grd.addColorStop(e/10,"rgba("+Math.floor(150/e)+","+Math.floor(150/e)+","+Math.floor(150/e)+",255");
            grd.addColorStop(e / 10, "rgba(" + 0 + "," + 0 + "," + 0 + "," + 1/(e*e) + ")");
        }
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctxLightsTemp.fillStyle = grd;
        ctxOutlineTemp.fillStyle = "rgba(255,255,255,1)";
        ctxLightsTemp.moveTo(lightEdges[lightEdges.length - 1][lightEdges[lightEdges.length - 1].length - 1][0], lightEdges[lightEdges.length - 1][lightEdges[lightEdges.length - 1].length - 1][1]);
        ctxOutlineTemp.moveTo(lightEdges[lightEdges.length - 1][lightEdges[lightEdges.length - 1].length - 1][0], lightEdges[lightEdges.length - 1][lightEdges[lightEdges.length - 1].length - 1][1]);
        for(o = lightEdges[lightEdges.length - 1].length - 1; o > 0; o--) {
            ctxLightsTemp.lineTo(lightEdges[lightEdges.length - 1][o - 1][0], lightEdges[lightEdges.length - 1][o - 1][1]);
            ctxOutlineTemp.lineTo(lightEdges[lightEdges.length - 1][o - 1][0], lightEdges[lightEdges.length - 1][o - 1][1]);
        }
        //         ctx.moveTo(lightEdges[lightEdges.length-1][0][0],lightEdges[lightEdges.length-1][0][1]);
        //         ctx.lineTo(lightEdges[lightEdges.length-1][lightEdges[lightEdges.length-1].length-1][0],lightEdges[lightEdges.length-1][lightEdges[lightEdges.length-1].length-1][1]);
        //         ctx.strokeStyle = "rgba(256,100,100,1)"
        //         ctx.lineWidth = 2;
        //         ctx.stroke();
        ctxLightsTemp.closePath();
        ctxOutlineTemp.closePath();
        ctxLightsTemp.fill();
        ctxOutlineTemp.fill();
        lightMaps.push(tempMap);
        darkMaps.push(tempMapOutline);
        //OLD CODE TO CHANGE PIXEL BY PIXEL!
        //     var lightsData = ctxLights.getImageData(0,0,lightMap.width,lightMap.height);
        //     var imgData = ctx.getImageData(0,0,gameScreen.width,gameScreen.height);
        //     for(e=0;e<imgData.data.length;e+=4){
        //         imgData.data[e]+=lightsData.data[e];
        //         imgData.data[e+1]+=lightsData.data[e+1];
        //         imgData.data[e+2]+=lightsData.data[e+2];
        // //         imgData.data[e+3]+=-100;
        //     }
        //         ctx.putImageData(imgData,0,0)
        //tint image based on light;
    }
//     ctxLights.globalCompositeOperation = "source-over";
//     for(i = 0; i < darkMaps.length; i++) {
//         ctxLights.drawImage(darkMaps[i], 0, 0);
//     }
    ctxLights.globalCompositeOperation = "source-out";
    ctxLights.fillStyle = "rgba(0,0,0,0.8)";
    ctxLights.rect(0, 0, lightMap.width, lightMap.height)
    ctxLights.fill();
    ctxLights.globalCompositeOperation = "source-over";
    //     
    ctxLights.globalCompositeOperation = "destination-out";
    for(i = 0; i < lightMaps.length; i++) {
        ctxLights.drawImage(lightMaps[i], 0, 0);
    }
    //     ctxLights.globalCompositeOperation = "source-over";
    //     for(i=0;i<lightMaps.length;i++){
    //         ctxLights.drawImage(lightMaps[i],0,0);
    //     }
    for(i = objs.length - 1; i > -1; i--) {
        //         objs[i][4]="dark";
        for(e = lights.length - 1; e > -1; e--) {
            for(o = lightEdges[e].length - 1; o > -1; o--) {}
        }
        ctx.fillStyle = (objs[i][4] == "light") ? "green" : "red";
        ctx.fillRect(objs[i][0] - (objs[i][2] / 2), objs[i][1] - (objs[i][3] / 2), objs[i][2], objs[i][3]);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.stroke();
}

function update() {
    gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
    lightMap.getContext("2d").clearRect(0, 0, lightMap.width, lightMap.height);
    renderTilemap();
    updateLights();
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
onLaunch();