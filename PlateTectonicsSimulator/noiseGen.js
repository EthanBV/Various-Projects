var gameScreen;
var infoBox;
var map = [];
var mapNoiseX = [];
var mapNoiseY = [];
var noise;
var size = 800;
var seaLevel = 130;
var landTiles = 0;
var seaTiles = 0;


var tileSize = 0.75;
var pixSize = 12;
var xOff = 0;
var yOff = 0;
function createGameScreen(){
    gameScreen = document.createElement("CANVAS");
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "rgba(0,0,0,1)";
    document.body.appendChild(gameScreen);
}

function createInfoBox(){
    infoBox = document.createElement("DIV");
    infoBox.style.position = "absolute";
    infoBox.style.left = "0px";
    infoBox.style.top = "0px";
    infoBox.style.width = window.innerWidth;
    infoBox.style.height = "30px";
    infoBox.style.backgroundColor = "rgba(100,100,100,1)";
    infoBox.innerHTML = "";
    document.body.appendChild(infoBox);
}

function generateMap(){
    var noise = new noise2d(size, 10);
    for(i = 0; i < size; i++){
        map.push([]);
        for(k = 0; k < size; k++){
            map[i].push(255*noise.getPoint(i,k));
//             map[i].push(100);
        }
        mapNoiseX.push(Math.floor(255*noise.getX(i)));
        mapNoiseY.push(Math.floor(255*noise.getY(i)));
    }
    
    
    
}

function generateMap2(){
    noise = new noise2d2(size, 100);
    var noise2 = new noise2d2(size, 20);
    var noise3 = new noise2d2(size, 200);
    for(i = 0; i < size; i++){
        map.push([]);
        for(k = 0; k < size; k++){
            map[i].push(255*(0.5*Math.pow(noise.getPointTri2(i,k),2)+0.2*Math.pow(noise2.getPointTri2(i,k),1)+0.3*Math.pow(noise3.getPointTri2(i,k),3/5)));
//             map[i].push(100);
        }
    }
    
    
    
}

function noise2d(width, magnitude){
    this.width = width;
    this.magnitude = magnitude;
    this.yAxis = [];
    this.xAxis = [];
    if(width%magnitude!=0)throw "width not divisible by magnitude";
    for(i = 0; i < (width)/magnitude; i++){
        this.yAxis.push(Math.random());
        this.xAxis.push(Math.random());
    }
    this.getPoint = function(x,y){
       return (this.getX(x)+this.getY(y))/2
    }
    
    this.getX = function(x){
        var bX, aX;
        
        if(x < this.magnitude)bX = this.xAxis[this.xAxis.length-1];
        else bX = this.xAxis[(x-x%this.magnitude)/this.magnitude];
        
        if(x >= this.width-this.magnitude)aX = this.xAxis[0];
        else aX = this.xAxis[(x-x%this.magnitude)/this.magnitude+1];
        
        var transX = x;
        
        var xXOff, xYOff, xAmp;
        xXOff = Math.floor(x/this.magnitude)*this.magnitude+this.magnitude/2;
        if(bX>aX)xXOff*=-1;
        xYOff = (bX+aX)/2;
        xAmp = Math.abs(bX-aX)/2;
        var xVal;
        xVal = xAmp*Math.sin((Math.PI/this.magnitude)*(transX-xXOff))+xYOff;
        return xVal; 
    }
    
    this.getY = function(y){
        var bY, aY;
        
        if(y < magnitude)bY = this.yAxis[this.yAxis.length-1];
        else bY = this.yAxis[(y-y%this.magnitude)/this.magnitude];
        
        if(y >= this.width-magnitude)aY = this.yAxis[0];
        else aY = this.yAxis[(y-y%this.magnitude)/this.magnitude+1];
        
        var transY = y;
        
        var yXOff, yYOff, yAmp;
        yXOff = Math.floor(y/this.magnitude)*this.magnitude+this.magnitude/2;
        if(bY>aY)yXOff*=-1;
        yYOff = (bY+aY)/2;
        yAmp = Math.abs(bY-aY)/2;
        var yVal;
        yVal = yAmp*Math.sin((Math.PI/this.magnitude)*(transY-yXOff))+yYOff;
        return yVal; 
    }
}

function noise2d2(width, magnitude){
    
    if(width%magnitude>1)throw "width not divisible by magnitude";
    this.width = width;
    this.magnitude = magnitude;
    this.grid = [];
    for(i = 0; i < width/magnitude; i++){
        this.grid.push([]);
        for(k = 0; k < width/magnitude; k++){
            this.grid[i].push(Math.random());
        }
    }

    this.getPoint = function(x, y){
        if(x>=this.width||y>=this.width||x<0||y<0)throw "point out of bounds of noise";
        var value = 0;
        var totalDist = 0;
        var maxDist = 0;
        for(j = 0; j < this.grid.length; j++){
            for(l = 0; l < this.grid[j].length; l++){
                var dist = Math.sqrt((x-j*this.magnitude)*(x-j*this.magnitude)+(y-l*this.magnitude)*(y-l*this.magnitude));
                totalDist+=Math.pow(dist+1,2);
                if(Math.pow(dist+1,2)>maxDist)maxDist=Math.pow(dist+1,2);
            }
        }
        var totalPoints = 0;
        for(j = 0; j < this.grid.length; j++){
            for(l = 0; l < this.grid[j].length; l++){
                var dist = Math.sqrt((x-j*this.magnitude)*(x-j*this.magnitude)+(y-l*this.magnitude)*(y-l*this.magnitude));
                dist = Math.min(dist, Math.sqrt(((x-size)-j*this.magnitude)*((x-size)-j*this.magnitude)+(y-l*this.magnitude)*(y-l*this.magnitude)));
                dist = Math.min(dist, Math.sqrt(((x+size)-j*this.magnitude)*((x+size)-j*this.magnitude)+(y-l*this.magnitude)*(y-l*this.magnitude)));
                dist = Math.min(dist, Math.sqrt((x-j*this.magnitude)*(x-j*this.magnitude)+((y-size)-l*this.magnitude)*((y-size)-l*this.magnitude)));
                dist = Math.min(dist, Math.sqrt((x-j*this.magnitude)*(x-j*this.magnitude)+((y+size)-l*this.magnitude)*((y+size)-l*this.magnitude)));
                dist = Math.min(dist, Math.sqrt(((x-size)-j*this.magnitude)*((x-size)-j*this.magnitude)+((y-size)-l*this.magnitude)*((y-size)-l*this.magnitude)));
                dist = Math.min(dist, Math.sqrt(((x+size)-j*this.magnitude)*((x+size)-j*this.magnitude)+((y+size)-l*this.magnitude)*((y+size)-l*this.magnitude)));
                var pointValue = maxDist/Math.pow(dist+1,2);
                    totalPoints+=pointValue;
                    value+=this.grid[j][l]*pointValue; 
            }
        }
        return value/totalPoints;
    }
    
    this.getPointTri1 = function(x, y){
        var gridX, gridY;
        gridX = Math.floor(x/this.magnitude);
        gridY = Math.floor(y/this.magnitude);
        var bl, br, tl, tr;
        bl = this.grid[gridX][gridY];
        
        if(gridX>=this.grid.length-1)br = this.grid[0][gridY];
        else br = this.grid[gridX+1][gridY];
        
        if(gridY>=this.grid.length-1)tl = this.grid[gridX][0];
        else tl = this.grid[gridX][gridY+1];
        
        if(gridX>=this.grid.length-1&&gridY>=this.grid.length-1)tr = this.grid[0][0];
        else if(gridX>=this.grid.length-1)tr = this.grid[0][gridY+1];
        else if(gridY>=this.grid.length-1)tr = this.grid[gridX+1][0];
        else tr = this.grid[gridX+1][gridY+1];
        var setX,setY;
        setX = x-(gridX*this.magnitude);
        setY = y-(gridY*this.magnitude);
        var lDist, rDist, bDist, tDist;
        lDist = setX;
        rDist = this.magnitude-lDist;
        bDist = setY;
        tDist = this.magnitude-bDist;
        
        var blDist, brDist, tlDist, trDist;
        
        var blDist = Math.sqrt(lDist*lDist+bDist*bDist);
        var brDist = Math.sqrt(rDist*rDist+bDist*bDist);
        var tlDist = Math.sqrt(lDist*lDist+tDist*tDist);
        var trDist = Math.sqrt(rDist*rDist+tDist*tDist);
        var diagonal = Math.sqrt(this.magnitude*this.magnitude*2);
        var short = Math.sqrt(this.magnitude*this.magnitude*2)/2;
        
        var value = 0;
        value += bl*Math.max(0,(this.magnitude-lDist)*(this.magnitude-bDist));
        value += br*(this.magnitude-rDist)*(this.magnitude-bDist);
        value += tl*(this.magnitude-lDist)*(this.magnitude-tDist);
        value += tr*Math.max(0,(this.magnitude-rDist)*(this.magnitude-tDist));
        console.log("X: "+x+" gridX: "+gridX+" setX: "+setX+" lDist: "+lDist+" rDist: "+rDist);
        return value/(this.magnitude*this.magnitude);
    }
    
    this.getPointTri2 = function(x, y){
        var gridX, gridY;
        gridX = Math.floor(x/this.magnitude);
        gridY = Math.floor(y/this.magnitude);
        var bl, br, tl, tr;
        bl = this.grid[gridX][gridY];
        
        if(gridX>=this.grid.length-1)br = this.grid[0][gridY];
        else br = this.grid[gridX+1][gridY];
        
        if(gridY>=this.grid.length-1)tl = this.grid[gridX][0];
        else tl = this.grid[gridX][gridY+1];
        
        if(gridX>=this.grid.length-1&&gridY>=this.grid.length-1)tr = this.grid[0][0];
        else if(gridX>=this.grid.length-1)tr = this.grid[0][gridY+1];
        else if(gridY>=this.grid.length-1)tr = this.grid[gridX+1][0];
        else tr = this.grid[gridX+1][gridY+1];
        var setX,setY;
        setX = x-(gridX*this.magnitude);
        setY = y-(gridY*this.magnitude);
        
        var lv, rv, bv, tv, la, ra, ba, ta, lxOff, rxOff, bxOff, txOff, lyOff, ryOff, byOff, tyOff;
        
        la = (bl-tl)/2;
        ra = (br-tr)/2;
        ba = (bl-br)/2;
        ta = (tl-tr)/2;
        
        lxOff = this.magnitude/2;
        rxOff = this.magnitude/2;
        bxOff = this.magnitude/2;
        txOff = this.magnitude/2;
        
        lyOff = (bl+tl)/2;
        ryOff = (br+tr)/2;
        byOff = (bl+br)/2;
        tyOff = (tl+tr)/2;
        
        lv = la*Math.sin((Math.PI/this.magnitude)*(setY+lxOff))+lyOff;
        rv = ra*Math.sin((Math.PI/this.magnitude)*(setY+rxOff))+ryOff;
        bv = ba*Math.sin((Math.PI/this.magnitude)*(setX+bxOff))+byOff;
        tv = ta*Math.sin((Math.PI/this.magnitude)*(setX+txOff))+tyOff;
        
        var lDist, rDist, bDist, tDist;
        lDist = setX;
        rDist = this.magnitude-lDist;
        bDist = setY;
        tDist = this.magnitude-bDist;
        
        var value = 0;
//         value += bl*Math.max(0,(this.magnitude-lDist)*(this.magnitude-bDist));
//         value += br*(this.magnitude-rDist)*(this.magnitude-bDist);
//         value += tl*(this.magnitude-lDist)*(this.magnitude-tDist);
//         value += tr*Math.max(0,(this.magnitude-rDist)*(this.magnitude-tDist));
        value += lv*(this.magnitude-lDist);
        value += rv*(this.magnitude-rDist);
        value += bv*(this.magnitude-bDist);
        value += tv*(this.magnitude-tDist);
        return value/(this.magnitude*2);
    }
}


function draw(){
    var ctx = gameScreen.getContext("2d");
    var tilesToDraw = [];
    for(i = 0; i < 255; i++){
        tilesToDraw.push([]);
    }
    landTiles = 0;
    seaTiles = 0;
    for(i = 0; i < size; i+=pixSize){
        for(k = 0; k < size; k+=pixSize){
            var x = i + xOff;
            var y = k + yOff;
            if(x>=size)x-=size;
            if(y>=size)y-=size;
            if(map[x][y]>seaLevel)landTiles++;
            else seaTiles++;
            var value = 0;
            for(j = 0; j < pixSize; j++){
                for(l = 0; l < pixSize; l++){
                    var x1 = x+j;
                    var y1 = y+l;
                    if(x1>=size)x1-=size;
                    if(y1>=size)y1-=size;
                    value+=Math.floor(map[x1][y1]);
                }
            }
            tilesToDraw[Math.floor(value/(pixSize*pixSize))].push([i,k]);
        }
    }
    
    
    
    for(i = 0; i < 255; i++){
        if(i>seaLevel)ctx.fillStyle = "rgb("+i+","+i+","+i+")";
        else ctx.fillStyle = "rgb("+i+","+i+","+i+")";
        ctx.beginPath();
        for(k = 0; k < tilesToDraw[i].length; k++){
            ctx.rect(30+tilesToDraw[i][k][0]*tileSize,30+tilesToDraw[i][k][1]*tileSize,tileSize*pixSize,tileSize*pixSize);
        }
        ctx.fill();
    }
    
    infoBox.innerHTML = "Land Area Percentage: "+Math.round(100*landTiles/(seaTiles+landTiles))+"%";
    
    
//     ctx.font = "7px Arial";
//     for(i = 0; i < size; i++){
//         for(k = 0; k < size; k++){
//             var x = i + xOff;
//             var y = k + yOff;
//             if(x>=size)x-=size;
//             if(y>=size)y-=size;
//             ctx.fill();
//             ctx.fillStyle="rgb(0,255,0)";
// //             if(x%2 == 0&& y%2 == 0)ctx.fillText(""+Math.floor(map[x][y]),30+i*tileSize,30+k*tileSize+7);
//         }
//     }
//     ctx.font = "15px Arial";
//     var offset = size/noise.grid.length*7;
//     for(i = 0; i < noise.grid.length; i++){
//         for(k = 0; k < noise.grid[i].length; k++){
//                 var x = i*noise.magnitude - xOff;
//                 var y = k*noise.magnitude - yOff;
//                 if(x<0)x+=size;
//                 if(y<0)y+=size;
//                 ctx.fillStyle="rgb(255,0,0)";
// //                 ctx.fillText(""+Math.floor(255*noise.grid[i][k]),30+x*tileSize,30+y*tileSize+15);
//         }
        
//     }
}

function update(){
    gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
    if(xOff<0)xOff+=size;
    if(xOff>=size)xOff-=size;
    if(yOff<0)yOff+=size;
    if(yOff>=size)yOff-=size;
    draw();
    window.requestAnimationFrame(update);
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 38) {
        yOff-=pixSize;
    }else if(event.keyCode == 40) {
        yOff+=pixSize;
    }else if(event.keyCode == 37) {
        xOff-=pixSize;
    }else if(event.keyCode == 39) {
        xOff+=pixSize;
    }
});
createGameScreen();
createInfoBox();
// generateMap();
generateMap2();
window.requestAnimationFrame(update);
// alert(map);