
//PLATE TECTONICS SIMULATOR IN JAVASCRIPT

//TODO
var TODO = {
//TODO:
// ----------HIGH PRIORITY:
//      - add the other forms of plate collision
//      - complete the wilson cycle
//      - change how starting plates are decided (via hotspots)
//      - generate oceanic trenches and ridges
//      - change so tiles are added to ocean plates before land plates.
//      - refine how plates decide which goes over which.
//      - tile age to simulate oceanic ridges
//
//  - make plates bump eachother and change direction and speed
//  - introduce the three types of plate bountaries
//  - better simulate erosion
//  - rework hotspot simulation: 
//      - when under land: bulge and occasional volcano, continents split
//      - when under water: volcanic activity
//  - add volcano simulation
//  
//  NOTES ON LAURI VIITANEN'S THESIS ON PLATE TECTONICS WORLDGEN
//      - oceanic crust is cycled on earth at the rate of 2.8 k^2 / year.
//      - continental crust is not cycled (only a little)
    
}

var gameScreen;
var infoBox;
var copyBox;
var world;
var mapNoiseX = [];
var mapNoiseY = [];
var size = 100;
var numPlates = 10;
var scale = size/100;

var numHotSpots = 15;

var seaLevel = 130;
var mountLevel = 195;
// var seaLevel = 80;
var landTiles = 0;
var seaTiles = 0;

var paused = false;

var ELEVATION = 0;
var PLATES = 1;
var HYBRID = 2;
var veiw = 0;

var tileSize = 4;

var pixSize = 4;


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
    
    copyBox = document.createElement("DIV");
    copyBox.style.position = "absolute";
    copyBox.style.left = "600px";
    copyBox.style.top = "0px";
    copyBox.style.width = window.innerWidth;
    copyBox.style.height = "30px";
    copyBox.style.fontSize = "3px";
    copyBox.style.backgroundColor = "rgba(100,100,100,1)";
    copyBox.innerHTML = "";
    document.body.appendChild(copyBox);
}

//move the plates;
function movePlates(){
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            world.map[i][k] = new tile(i,k,0, 0);
//             world.map[i][k].plate = world.plates[0];
        }
    }
    for(i = 0; i < world.plates.length; i++){
        world.plates[i].xCounter+=world.plates[i].xVel;
        world.plates[i].yCounter+=world.plates[i].yVel;
        var xMove = Math.round(world.plates[i].xCounter);
        var yMove = Math.round(world.plates[i].yCounter);
        world.plates[i].xCounter-=xMove;
        world.plates[i].yCounter-=yMove;
        for(k = 0; k < world.plates[i].centerPoints.length; k++){
            world.plates[i].centerPoints[k][0]+=Math.round(xMove);
            world.plates[i].centerPoints[k][1]+=Math.round(yMove);
            if(world.plates[i].centerPoints[k][0] < 0)world.plates[i].centerPoints[k][0]+=size;
            if(world.plates[i].centerPoints[k][0] >= size)world.plates[i].centerPoints[k][0]-=size;
            if(world.plates[i].centerPoints[k][1] < 0)world.plates[i].centerPoints[k][1]+=size;
            if(world.plates[i].centerPoints[k][1] >= size)world.plates[i].centerPoints[k][1]-=size;
        }
        for(k = 0; k < world.plates[i].tiles.length; k++){
            world.plates[i].tiles[k].x+=Math.round(xMove);
            world.plates[i].tiles[k].y+=Math.round(yMove);
            
            if(world.plates[i].tiles[k].x>=size)world.plates[i].tiles[k].x-=size;
            if(world.plates[i].tiles[k].y>=size)world.plates[i].tiles[k].y-=size;
            if(world.plates[i].tiles[k].x<0)world.plates[i].tiles[k].x+=size;
            if(world.plates[i].tiles[k].y<0)world.plates[i].tiles[k].y+=size;
            
        }
    }
    
}

//plates interact with eachother
function collidePlates(){
    var topPlates = [];
    for(i = 0; i < size; i++){
        topPlates.push([]);
        for(k = 0; k < size; k++){
            topPlates[i].push(-1);
        }
    }
    
    for(i = world.plates.length-1; i >=0; i--){
        for(k = 0; k < world.plates[i].tiles.length; k++){
            if(topPlates[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y] == -1)topPlates[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y] = i;
        }
    }
    
   for(i = world.plates.length-1; i >=0; i--){
        for(k = 0; k < world.plates[i].tiles.length; k++){
            if(i!=topPlates[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y]){
                if(world.plates[topPlates[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y]].elevation-world.plates[i].elevation<0.3){
                world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].elevation+=1+world.plates[i].tiles[k].elevation/200;
                world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].elevation = Math.min(254,world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].elevation);
                world.plates[i].tiles[k].counter--;
                }else{
                    
                world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].elevation+=1+world.plates[i].tiles[k].elevation/200;
                world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].elevation = Math.min(254,world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].elevation);
                world.plates[i].tiles[k].counter--;
                }
            }
        }
    }
    
}

//fill empty tiles with new ones
function upwell(){
    var tempPlateMap = [];
    for(i = 0; i < size; i++){
        tempPlateMap.push([]);
        for(k = 0; k < size; k++){
            tempPlateMap[i][k] = world.map[i][k].plate;
        }
    }
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            if(world.map[i][k].plate==null){
                var queue = [[i,k]];
                for(j = 0; j < queue.length; j++){
                    var x = queue[j][0];
                    var y = queue[j][1];
//                     console.log([x,y]);
                    if(tempPlateMap[x][y]==null){
                        var toAddToQue = [[x-1,y],[x+1,y],[x,y-1],[x,y+1]];
                        if(x+1>=size){
                            toAddToQue[1][0]-=size;
                        }
                        if(x-1<0){
                            toAddToQue[0][0]+=size;
                        }
                        if(y+1>=size){
                            toAddToQue[3][1]-=size;
                        }
                        if(y-1<0){
                            toAddToQue[2][1]+=size;
                        }
                        toAddToQue = reorder(toAddToQue);
                        for(l = 0; l < toAddToQue.length; l++){
                           if(!containsArr(queue,toAddToQue[l]))queue.push(toAddToQue[l]);
                        }
                    }else{
                        world.map[i][k].plate = tempPlateMap[queue[j][0]][queue[j][1]];
                        world.plates[world.plates.indexOf(tempPlateMap[queue[j][0]][queue[j][1]])].tiles.push(world.map[i][k]);
                        break;
                    }
                }
            }
            if(world.map[i][k].elevation<70)world.map[i][k].elevation+=Math.random()*(60-world.map[i][k].elevation)*0.5
        }
    }
}

//destroy tiles under plates
function downwell(){
    for(i = world.plates.length-1; i >=0; i--){
        for(k = 0; k < world.plates[i].tiles.length; k++){
            if(world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].plate == null || world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].elevation < world.plates[i].tiles[k].elevation){
                world.map[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y] = world.plates[i].tiles[k];
            }
        }
    }
}

function hotSpots(){
    for(i = 0; i < world.hotSpots.length; i++){
        var queue = [];
        queue.push([world.hotSpots[i].x,world.hotSpots[i].y,world.hotSpots[i].strength,world.hotSpots[i].radius]);
        for(k = 0; k < queue.length; k++){
            if(world.map[queue[k][0]][queue[k][1]].elevation<seaLevel)world.map[queue[k][0]][queue[k][1]].elevation+=Math.max(0,queue[k][2]*(queue[k][3]/world.hotSpots[i].radius));
            if(queue[k][3]>0){
                var toAddToQueue = [];
                toAddToQueue.push([queue[k][0]+1,queue[k][1],queue[k][2],queue[k][3]-1]);
                toAddToQueue.push([queue[k][0]-1,queue[k][1],queue[k][2],queue[k][3]-1]);
                toAddToQueue.push([queue[k][0],queue[k][1]+1,queue[k][2],queue[k][3]-1]);
                toAddToQueue.push([queue[k][0],queue[k][1]-1,queue[k][2],queue[k][3]-1]);
                for(j = 0; j < toAddToQueue.length; j++){
                    if(toAddToQueue[j][0]>=size)toAddToQueue[j][0]-=size;
                    if(toAddToQueue[j][0]<0)toAddToQueue[j][0]+=size;
                    if(toAddToQueue[j][1]>=size)toAddToQueue[j][1]-=size;
                    if(toAddToQueue[j][1]<0)toAddToQueue[j][1]+=size;
                    var add = true;
                    for(l = 0; l < queue.length; l++){
                        if(queue[l][0]==toAddToQueue[j][0]&&queue[l][1]==toAddToQueue[j][1]){
                            add = false;
                            break;
                        }
                    }
                    if(add)queue.push(toAddToQueue[j]);
                }
            }
        }
        world.hotSpots[i].strength+=world.hotSpots[i].strengthChange;
        for(k = 0; k < 100; k++){
            world.hotSpots[i].strengthChange-=(world.hotSpots[i].strength - world.hotSpots[i].baseStrength)*(world.hotSpots[i].periodLength/100);    
        }
        world.hotSpots[i].xCounter+=world.hotSpots[i].dx;
        world.hotSpots[i].yCounter+=world.hotSpots[i].dy;
        world.hotSpots[i].x+=Math.round(world.hotSpots[i].xCounter);
        world.hotSpots[i].y+=Math.round(world.hotSpots[i].yCounter);
        
        world.hotSpots[i].xCounter-=Math.round(world.hotSpots[i].xCounter);
        world.hotSpots[i].yCounter-=Math.round(world.hotSpots[i].yCounter);
        
        if(world.hotSpots[i].x<0)world.hotSpots[i].x+=size;
        if(world.hotSpots[i].x>=size)world.hotSpots[i].x-=size;
        if(world.hotSpots[i].y<0)world.hotSpots[i].y+=size;
        if(world.hotSpots[i].y>=size)world.hotSpots[i].y-=size;
        
        world.hotSpots[i].age++;
        if(world.hotSpots[i].age > world.hotSpots[i].maxAge){
            world.hotSpots.splice(i,1);
            i--;
        }
    }
    
    if(Math.random()>world.hotSpots.length/numHotSpots){
        world.hotSpots.push(new hotSpot());
    }
}

function wilsonCycle(){
    var tempPlateMap = [];
    for(i = 0; i < size; i++){
        tempPlateMap.push([]);
        for(k = 0; k < size; k++){
            tempPlateMap[i][k]=[];
        } 
    }
    
    
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            for(j = 0; j < world.plates.length; j++){
                world.plates[j].tileMap[i][k]=null;
            }
        }
    }
    
    for(i = 0; i < world.plates.length; i++){
        world.plates[i].overlapingPlates = [];
        for(k = 0; k < world.plates[i].tiles.length; k++){
            world.plates[i].overlapingPlates.push([[],[],[],[]]);
            world.plates[i].tileMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y] = world.plates[i].tiles[k];
            tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].push([i,world.plates[i].tiles[k]]);
        }
    }
    
    for(i = 0; i < world.plates.length; i++){
        for(k = 0; k < world.plates[i].tiles.length; k++){
            for(j = 0; j < tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y].length; j++){
                if(tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y][j][0]!=i){
                    //code to detect which type of border it is
                    var x = world.plates[i].tiles[k].x;
                    var y = world.plates[i].tiles[k].y;
                    var thisPlate = world.plates[i];
                    var otherPlate = world.plates[tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y][j][0]];
                    var thisTile = thisPlate.tiles[k];
                    var otherTile = tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y][j][1];
//                     console.log(otherTile);
                    var thisLand = (thisTile.elevation>seaLevel);
                    var otherLand = (otherTile.elevation>seaLevel);
                    if(thisLand&&otherLand){
                        //continental collision
                        thisPlate.overlapingPlates[tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y][j][0]][0].push([x,y]);
                    }else if(!thisLand&&!otherLand){
                        //oceanic collision
                        thisPlate.overlapingPlates[tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y][j][0]][1].push([x,y]);
                    }else if(thisLand){
                        //continental - oceanic collision
                        thisPlate.overlapingPlates[tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y][j][0]][2].push([x,y]);
                    }else{
                        //oceanic - continental collision
                        thisPlate.overlapingPlates[tempPlateMap[world.plates[i].tiles[k].x][world.plates[i].tiles[k].y][j][0]][3].push([x,y]);
                    }
                }
            }
        }
    }
    
    //handle subduction between continent - ocean here
    for(i = 0; i < world.plates.length; i++){
        for(k = 0; k < world.plates[i].overlapingPlates.length; k++){
            for(j = 0; j < world.plates[i].overlapingPlates[k][3].length; j++){
                var x = world.plates[i].overlapingPlates[k][3][j][0];
                var y = world.plates[i].overlapingPlates[k][3][j][1];
                var thisTile = world.plates[i].tileMap[x][y];
                var otherTile = world.plates[k].tileMap[x][y];
                otherTile.elevation+=3;
                thisTile.counter--;
                
            }
        }
    }
    
    //then handle subduction between ocean - ocean here
    for(i = 0; i < world.plates.length; i++){
        for(k = 0; k < world.plates[i].overlapingPlates.length; k++){
            for(j = 0; j < world.plates[i].overlapingPlates[k][1].length; j++){
                var x = world.plates[i].overlapingPlates[k][1][j][0];
                var y = world.plates[i].overlapingPlates[k][1][j][1];
                var thisTile = world.plates[i].tileMap[x][y];
                var otherTile = world.plates[k].tileMap[x][y];
                otherTile.elevation-=5;
                thisTile.counter--;
//                 
//                 
                
            }
        }
    }
    
    
    //deleate subducted tiles;
    
    //this handles collision of continents
    var platesToFuse = [];
    //change to more reliably chose which plate goes under which <---- based on mass and speed? vectors aswell?
    //1st is over plate
    //2nd is under plate
    for(i = 0; i < world.plates.length; i++){
        var totalTiles = 0;
        for(k = 0; k < world.plates[i].tiles.length; k++){
            if(world.plates[i].tiles[k].elevation > seaLevel)totalTiles++;
        }
        for(k = 0;k < world.plates[i].overlapingPlates.length; k++){
            for(j = 0; j < world.plates[i].overlapingPlates[k][0].length; j++){
                var x = world.plates[i].overlapingPlates[k][0][j][0];
                var y = world.plates[i].overlapingPlates[k][0][j][1];
                var thisTile = world.plates[i].tileMap[x][y];
                var otherTile = world.plates[k].tileMap[x][y];
                
                otherTile.elevation+=6;
                thisTile.elevation.counter-=0.1;
                
            }
            if(world.plates[i].overlapingPlates[k][0].length > totalTiles/25){
                if(!containsArr(platesToFuse,[k,i]))platesToFuse.push([i,k]);
            }
        }
    }
    
    //SERIOUSLY NEED TO OPTIMIZE: GIVES KILL MESSAGE IN CHROME BUT DOES WORK IF YOU WAIT <--------------
    
    for(i = 0; i < platesToFuse.length; i++){
        for(k = 0; k < world.plates[platesToFuse[i][1]].tiles.length; k++){
            var x = world.plates[platesToFuse[i][1]].tiles[k].x;
            var y = world.plates[platesToFuse[i][1]].tiles[k].y;
            var overTile = world.plates[platesToFuse[i][0]].tileMap[x][y];
//             for(l = 0; l < world.plates[platesToFuse[i][0]].tiles.length; l++){
//                 if(x == world.plates[platesToFuse[i][0]].tiles[l].x&&y == world.plates[platesToFuse[i][0]].tiles[l].y){
//                     overTile = world.plates[platesToFuse[i][0]].tiles[l];
//                 }
//             }
            if(overTile == null){
                world.plates[platesToFuse[i][0]].tiles.push(world.plates[platesToFuse[i][1]].tiles[k]);
            }else{
                var overTileIsLand = false;
                if(overTile.elevation > seaLevel)overTileIsLand = true;
                if(overTileIsLand == true){
//                     if(world.plates[platesToFuse[i][1]].tiles[k].elevation > seaLevel)overTile.elevation+=30;
                }
                else if(world.plates[platesToFuse[i][1]].tiles[k].elevation > seaLevel){
                    world.plates[platesToFuse[i][0]].tiles.splice(world.plates[platesToFuse[i][0]].tiles.indexOf(overTile),1);
                    world.plates[platesToFuse[i][0]].tiles.push(world.plates[platesToFuse[i][1]].tiles[k]);
                }
            }
            world.plates[platesToFuse[i][0]].tiles[world.plates[platesToFuse[i][0]].tiles.length-1].plate = world.plates[platesToFuse[i][0]];
        }
        
        ///change this velocity average to reflect size
        world.plates[platesToFuse[i][0]].xVel+=world.plates[platesToFuse[i][1]].xVel;
        world.plates[platesToFuse[i][0]].xVel*=0.5;
        world.plates[platesToFuse[i][0]].yVel+=world.plates[platesToFuse[i][1]].yVel;
        world.plates[platesToFuse[i][0]].yVel*=0.5;
        world.plates.splice(platesToFuse[i][1],1);
        
        for(k = 0; k < platesToFuse.length; k++){
            if(platesToFuse[k][0]==platesToFuse[i][1])platesToFuse[k][0] = platesToFuse[i][0];
            if(platesToFuse[k][1]==platesToFuse[i][1])platesToFuse[k][1] = platesToFuse[i][0];
            if(platesToFuse[k][1]>platesToFuse[i][1])platesToFuse[k][1]--;
            if(platesToFuse[k][0]>platesToFuse[i][1])platesToFuse[k][0]--;
        }
    }
    
    
    //delete tiles
    for(i = 0; i < world.plates.length; i++){
        for(k = 0; k < world.plates[i].tiles.length; k++){
            if(world.plates[i].tiles[k].counter < 0){
                world.plates[i].tiles.splice(k,1);
                k--;
            }
        }
    }
    
    //handle spliting of continents here
}

function erosion(){
  
  var tempMap = [];
  for(i = 0; i < size; i++){
    tempMap.push([]);
    for(k = 0; k < size; k++){
      tempMap[i][k] = world.map[i][k].elevation;
    }
  }
  
  for(i = 0; i < size; i++){
    for(k = 0; k < size; k++){
      var leftX = i - 1;
      var leftY = k;
      if(leftX < 0)leftX+=size;
      var rightX = i + 1;
      var rightY = k;
      if(rightX >= size)rightX-=size;
      var botX = i;
      var botY = k - 1;
      if(botY < 0)botY+=size;
      var topX = i;
      var topY = k + 1;
      if(topY >=size)topY-=size;
      
      var leftDiff = tempMap[i][k]-tempMap[leftX][leftY];
      var rightDiff = tempMap[i][k]-tempMap[rightX][rightY];
      var botDiff = tempMap[i][k]-tempMap[botX][botY];
      var topDiff = tempMap[i][k]-tempMap[topX][topY];
      world.map[i][k].elevation-=leftDiff/80;
      world.map[i][k].elevation-=rightDiff/80;
      world.map[i][k].elevation-=botDiff/80;
      world.map[i][k].elevation-=topDiff/80;
    }
  }
}

function smooth(){
    
    for(e = 0; e <0; e++)for(i = 0; i < size; i++){
        
        for(k = 0; k < size; k++){
            var x, y;
            x = i-1;
            y = k;
            if(x<0)x+=size;
            if(world.map[x][y].elevation>world.map[i][k].elevation)world.map[i][k].elevation++;
            else world.map[i][k].elevation--;
            
            x = i+1;
            y = k;
            if(x>=size)x-=size;
            if(world.map[x][y].elevation>world.map[i][k].elevation)world.map[i][k].elevation++;
            else world.map[i][k].elevation--;
            
            x = i;
            y = k-1;
            if(y<0)y+=size;
            if(world.map[x][y].elevation>world.map[i][k].elevation)world.map[i][k].elevation++;
            else world.map[i][k].elevation--;
            
            x = i;
            y = k+1;
            if(y>=size)y-=size;
            if(world.map[x][y].elevation>world.map[i][k].elevation)world.map[i][k].elevation++;
            else world.map[i][k].elevation--;
            
            world.map[i][k].elevation = Math.max(0,world.map[i][k].elevation);
            world.map[i][k].elevation = Math.min(254,world.map[i][k].elevation);
        }
    }
    
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            if(world.map[i][k].elevation>254)world.map[i][k].elevation = 254;
            if(world.map[i][k].elevation<0)world.map[i][k].elevation = 0;
        }
    }
}

function draw(){
    var ctx = gameScreen.getContext("2d");
//     var tilesToDraw = [];
//     var platesToDraw = [];
//     for(i = 0; i < 255; i++){
//         tilesToDraw.push([]);
//     }
//     for(i = 0; i < world.plates.length; i++){
//         platesToDraw.push([]);
//     }
//     landTiles = 0;
//     seaTiles = 0;
//     for(i = 0; i < size; i+=pixSize){
//         for(k = 0; k < size; k+=pixSize){
//             var x = i + xOff;
//             var y = k + yOff;
//             if(x>=size)x-=size;
//             if(y>=size)y-=size;
//             if(world.map[x][y].elevation>seaLevel)landTiles++;
//             else seaTiles++;
//             var value = 0;
//             for(j = 0; j < pixSize; j++){
//                 for(l = 0; l < pixSize; l++){
//                     var x1 = x+j;
//                     var y1 = y+l;
//                     if(x1>=size)x1-=size;
//                     if(y1>=size)y1-=size;
//                     value+=Math.floor(world.map[x1][y1].elevation);
//                 }
//             }
//             tilesToDraw[Math.floor(value/(pixSize*pixSize))].push([i,k]);
//             if(world.map[x][y].plate!=null&&world.plates.indexOf(world.map[x][y].plate)!=-1)platesToDraw[world.plates.indexOf(world.map[x][y].plate)].push([i,k]);
//         }
//     }
    
    
    
//     for(i = 0; i < 255; i++){
//         if(i>seaLevel)ctx.fillStyle = "rgb("+0+","+i+","+0+")";
//         else ctx.fillStyle = "rgb("+0+","+0+","+i+")";
//         ctx.beginPath();
//         for(k = 0; k < tilesToDraw[i].length; k++){
//             ctx.rect(30+tilesToDraw[i][k][0]*tileSize,30+tilesToDraw[i][k][1]*tileSize,tileSize*pixSize,tileSize*pixSize);
//         }
//         ctx.fill();
//     }
    
//     for(i = 0; i < platesToDraw.length; i++){
//         var alpha = (veiw == 0)?0:(veiw == 1)?1:0.3;
//         ctx.fillStyle = "rgba("+world.plates[i].color[0]+","+world.plates[i].color[1]+","+world.plates[i].color[2]+","+alpha+")";
//         ctx.beginPath();
//         for(k = 0; k < platesToDraw[i].length; k++){
//             ctx.rect(30+platesToDraw[i][k][0]*tileSize,30+platesToDraw[i][k][1]*tileSize,tileSize*pixSize,tileSize*pixSize);
//         }
//         ctx.fill();
//     }
    
//     if(veiw == 1 || veiw == 2){
//         for(i = 0; i < world.plates.length; i++){
//             ctx.fillStyle = "rgba(100,100,100,1)";
//             ctx.beginPath();
//             for(k = 0; k < world.plates[i].centerPoints.length; k++){
//                 var x = +world.plates[i].centerPoints[k][0] - xOff;
//                 var y = +world.plates[i].centerPoints[k][1] - yOff;
//                 if(x<0)x+=size;
//                 if(y<0)y+=size;
//                 ctx.rect(30+x*tileSize,30+y*tileSize,tileSize*pixSize,tileSize*pixSize);
//             }
//             ctx.fill();
//         }
//         ctx.fillStyle = "rgb(255,100,100)";
//         for(i = 0; i < world.hotSpots.length; i++){
//             ctx.beginPath();
//             ctx.arc(30+world.hotSpots[i].x*tileSize,30+world.hotSpots[i].y*tileSize,world.hotSpots[i].radius*tileSize,0,2*Math.PI);
//             ctx.fill();
//         }
//     }
    
   var x_offset = gameScreen.width/2;
  var y_offset = gameScreen.height*0.95;
  var xConstant = pixSize;
  var yConstant = pixSize/2;
  for(i = (veiw===0||veiw==1)?size - 1:0; (veiw===0||veiw==1)?i >= 0:i<size; (veiw===0||veiw==1)?i--:i++){
    for(k = (veiw===0||veiw==3)?size - 1:0; (veiw===0||veiw==3)?k >= 0:k<size; (veiw===0||veiw==3)?k--:k++){
//   for(i = 0; i<size; i++){
//     for(k = 0; k<size; k++){
      var beforeI = i;
      var beforeK = k;
      var x = x_offset;
      var y = y_offset;
      if(veiw === 0){
        x += i*xConstant-k*xConstant;
        y -=i*yConstant+k*yConstant;
      }else if(veiw == 1){
        x += (size-k)*xConstant-i*xConstant;
        y -=(size-k)*yConstant+i*yConstant;
      }else if(veiw == 2){
        x += (size-i)*xConstant-(size-k)*xConstant;
        y -=(size-i)*yConstant+(size-k)*yConstant;
      }else{
        x += k*xConstant-(size-i)*xConstant;
        y -=k*yConstant+(size-i)*yConstant;
      }
      i-=xOff;
      k-=yOff;
      if(i<0)i+=size;
      if(k<0)k+=size;
      if(world.map[i][k].elevation > mountLevel){
//         ctx.fillStyle = "rgb("+Math.floor(world.map[i][k].elevation)+","+Math.floor(world.map[i][k].elevation)+","+Math.floor(world.map[i][k].elevation)+")";
        ctx.strokeStyle = "rgb("+Math.floor(world.map[i][k].elevation/1.0)+","+Math.floor(world.map[i][k].elevation/1.0)+","+Math.floor(world.map[i][k].elevation/1.0)+")";
      }else if(world.map[i][k].elevation >= seaLevel){
//         ctx.fillStyle = "rgb(0,"+Math.floor(world.map[i][k].elevation)+",0)";
        ctx.strokeStyle = "rgb(0,"+Math.floor(world.map[i][k].elevation/1.0)+",0)";
      }else{
//         ctx.fillStyle = "rgb("+Math.floor(world.map[i][k].elevation)+","+Math.floor(world.map[i][k].elevation/2)+",0)";
        ctx.strokeStyle = "rgb("+Math.floor(world.map[i][k].elevation/1.0)+","+Math.floor(world.map[i][k].elevation/2.0)+",0)";
      } 
      ctx.fillStyle = getColor(world.map[i][k].elevation);
      ctx.strokeStyle = getColor(world.map[i][k].elevation);
      var height = Math.floor(world.map[i][k].elevation);
      ctx.beginPath();
      //slopes
      var behindHeight;
      var rightHeight;
      var leftHeight;
      var tempI;
      var tempK;
      if(veiw === 0){
        tempI = i+1;
        if(tempI>=size)tempI-=size;
        tempK = k+1;
        if(tempK>=size)tempK-=size;
        behindHeight = Math.floor(world.map[tempI][tempK].elevation);
        rightHeight = Math.floor(world.map[tempI][k].elevation);
        leftHeight = Math.floor(world.map[i][tempK].elevation);
      }else if(veiw == 1){
        tempI = i+1;
        if(tempI>=size)tempI-=size;
        tempK = k-1;
        if(tempK<0)tempK+=size;
        behindHeight = Math.floor(world.map[tempI][tempK].elevation);
        rightHeight = Math.floor(world.map[i][tempK].elevation);
        leftHeight = Math.floor(world.map[tempI][k].elevation);
      }else if(veiw == 2){
        tempI = i-1;
        if(tempI<0)tempI+=size;
        tempK = k-1;
        if(tempK<0)tempK+=size;
        behindHeight = Math.floor(world.map[tempI][tempK].elevation);
        rightHeight = Math.floor(world.map[tempI][k].elevation);
        leftHeight = Math.floor(world.map[i][tempK].elevation);
      }else{
        tempI = i-1;
        if(tempI<0)tempI+=size;
        tempK = k+1;
        if(tempK>=size)tempK-=size;
        behindHeight = Math.floor(world.map[tempI][tempK].elevation);
        rightHeight = Math.floor(world.map[i][tempK].elevation);
        leftHeight = Math.floor(world.map[tempI][k].elevation);
      }
      height/=scale;
      behindHeight/=scale;
      rightHeight/=scale;
      leftHeight/=scale;
      ctx.moveTo(x, y-behindHeight);
      ctx.lineTo(x+xConstant,y+yConstant-rightHeight);
      ctx.lineTo(x,y+yConstant*2-height);
      ctx.lineTo(x-xConstant,y+yConstant-leftHeight);
      ctx.lineTo(x, y-behindHeight);
      //tiles
//       ctx.moveTo(x, y-height);
//       ctx.lineTo(x+xConstant,y+yConstant-height);
//       ctx.lineTo(x,y+yConstant*2-height);
//       ctx.lineTo(x-xConstant,y+yConstant-height);
//       ctx.lineTo(x, y-height);
      ctx.stroke();
      ctx.fill();
      if(world.map[i][k].elevation > mountLevel)ctx.fillStyle = "rgb("+Math.floor(world.map[i][k].elevation/1.3)+","+Math.floor(world.map[i][k].elevation/1.3)+","+Math.floor(world.map[i][k].elevation/1.3)+")";
      else if(world.map[i][k].elevation >= seaLevel) ctx.fillStyle = "rgb(0,"+Math.floor(world.map[i][k].elevation/1.3)+",0)";
      else ctx.fillStyle = "rgb("+Math.floor(world.map[i][k].elevation/1.3)+","+Math.floor(world.map[i][k].elevation/2.6)+",0)";
      ctx.beginPath();
      ctx.moveTo(x, y+yConstant*2-height);
      ctx.lineTo(x,y+yConstant*2);
      ctx.lineTo(x+xConstant,y+yConstant);
      ctx.lineTo(x+xConstant, y+yConstant-height);
      ctx.moveTo(x-xConstant, y+yConstant-height);
      ctx.lineTo(x-xConstant,y+yConstant);
      ctx.lineTo(x,y+yConstant*2);
      ctx.lineTo(x,y+yConstant*2-height);
      ctx.lineTo(x-xConstant,y+yConstant-height);
      //enable during tiles
//       ctx.fill();
      
      //draw sides
      ctx.fillStyle = "rgb( 64, 39, 24)";
      ctx.strokeStyle = "rgb( 64, 39, 24)";
        ctx.beginPath();
      
      if(veiw === 0){
          if(beforeI === 0){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x-xConstant, y+yConstant);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
          if(beforeK === 0){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x+xConstant, y+yConstant);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
        }else if(veiw === 1){
          if(beforeK === size-1){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x-xConstant, y+yConstant);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
          if(beforeI === 0){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x+xConstant, y+yConstant);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
        }else if(veiw === 2){
          if(beforeI === size-1){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x-xConstant, y+yConstant);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
          if(beforeK === size-1){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x+xConstant, y+yConstant);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
        }else if(veiw === 3){
          if(beforeK === 0){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x-xConstant, y+yConstant);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
          if(beforeI === size-1){
            ctx.moveTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x, y+yConstant*2);
            ctx.lineTo(x+xConstant, y+yConstant);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x,y+yConstant*2-world.map[i][k].elevation/scale);
          }
        }
      ctx.fill();
      ctx.stroke();
      
      //draw oceans
      if(world.map[i][k].elevation < seaLevel){
        ctx.fillStyle = "rgba(0,0,255,0.3)";
        ctx.beginPath();
        ctx.moveTo(x, y-seaLevel/scale); // this is the right position
        ctx.lineTo(x+(xConstant),y+(yConstant)-seaLevel/scale); 
        ctx.lineTo(x,y+(yConstant*2)-seaLevel/scale); //fix this first
        ctx.lineTo(x-(xConstant),y+(yConstant)-seaLevel/scale);
        ctx.lineTo(x, y-seaLevel/scale); //this is the right postion
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,150,0.3)";
        if(veiw === 0){
          if(beforeI === 0){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x-xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
          if(beforeK === 0){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x+xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
        }else if(veiw === 1){
          if(beforeK === size-1){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x-xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
          if(beforeI === 0){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x+xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
        }else if(veiw === 2){
          if(beforeI === size-1){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x-xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
          if(beforeK === size-1){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x+xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
        }else if(veiw === 3){
          if(beforeK === 0){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x-xConstant, y+yConstant-leftHeight);
            ctx.lineTo(x-xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
          if(beforeI === size-1){
            ctx.moveTo(x,y+yConstant*2-seaLevel/scale);
            ctx.lineTo(x, y+yConstant*2-world.map[i][k].elevation/scale);
            ctx.lineTo(x+xConstant, y+yConstant-rightHeight);
            ctx.lineTo(x+xConstant, y+yConstant-seaLevel/scale);
            ctx.lineTo(x,y+yConstant*2-seaLevel/scale);
          }
        }
        ctx.fill();
      }
      i = beforeI;
      k = beforeK;
    }
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

function updateCenters(){
    for(i = 0; i < world.plates.length; i++){
        var centerX = 0;
        var centerY = 0;
        var oldCenterX = world.plates[i].centerPoints[0][0];
        var oldCenterY = world.plates[i].centerPoints[0][1];
        for(k = 0; k < world.plates[i].tiles.length; k++){
            var x = world.plates[i].tiles[k].x;
            var y = world.plates[i].tiles[k].y
            if(Math.sqrt((x-oldCenterX+size)*(x-oldCenterX+size)+(y-oldCenterY)*(y-oldCenterY))<Math.sqrt((x-oldCenterX)*(x-oldCenterX)+(y-oldCenterY)*(y-oldCenterY))){
                x+=size;
            }else if(Math.sqrt((x-oldCenterX-size)*(x-oldCenterX-size)+(y-oldCenterY)*(y-oldCenterY))<Math.sqrt((x-oldCenterX)*(x-oldCenterX)+(y-oldCenterY)*(y-oldCenterY))){
                x-=size;
            }
            if(Math.sqrt((x-oldCenterX)*(x-oldCenterX)+(y-oldCenterY+size)*(y-oldCenterY+size))<Math.sqrt((x-oldCenterX)*(x-oldCenterX)+(y-oldCenterY)*(y-oldCenterY))){
                y+=size;
            }else if(Math.sqrt((x-oldCenterX)*(x-oldCenterX)+(y-oldCenterY-size)*(y-oldCenterY-size))<Math.sqrt((x-oldCenterX)*(x-oldCenterX)+(y-oldCenterY)*(y-oldCenterY))){
                y-=size;
            }
            centerX+=x;
            centerY+=y;
        }
        
        centerX/= world.plates[i].tiles.length;
        centerY/= world.plates[i].tiles.length;
        if(centerX >= size)centerX-=size;
        if(centerX < 0)centerX+=size;
        if(centerY >= size)centerY-=size;
        if(centerY < 0)centerY+=size;
        
        world.plates[i].centerPoints = [[centerX, centerY]];
    }
}

function update(){
    gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
    if(xOff<0)xOff+=size;
    if(xOff>=size)xOff-=size;
    if(yOff<0)yOff+=size;
    if(yOff>=size)yOff-=size;
    
    if(!paused){
        movePlates();
        downwell();
//         collidePlates();
        upwell();
        hotSpots();
        wilsonCycle();
        erosion();
        smooth();
        updateCenters();
    }
    draw();
    window.requestAnimationFrame(update);
}

var indexes = [0,   100, 135,  145, 185, 195, 255];
var reds =    [20, 75,  100,  0,   0,   150, 230];
var greens =  [10,  45,  120,   100, 170, 150, 230];
var blues =   [0,   0,   50,   0,   0,   150, 230];
function getColor(layer){
  var red;
  var green;
  var blue;
  var baseLayer;
  var topLayer;
  for(d = 0; d < indexes.length; d++){
    if(layer > indexes[d]){
      baseLayer = d;
      topLayer = d+1;
    }
  }
  var percent = (layer - indexes[baseLayer])/(indexes[topLayer] - indexes[baseLayer]);
  red = reds[topLayer]*percent+reds[baseLayer]*(1-percent);
  blue = blues[topLayer]*percent+blues[baseLayer]*(1-percent);
  green = greens[topLayer]*percent+greens[baseLayer]*(1-percent);
  return "rgb("+Math.floor(red)+","+Math.floor(green)+","+Math.floor(blue)+")";
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
    }else if(event.keyCode == 32) {
        paused=!paused;
    }else if(event.keyCode == 190) {
        veiw--;
        if(veiw < 0)veiw = 3;
    }else if(event.keyCode == 188) {
        veiw++;
        if(veiw > 3)veiw = 0;
    }else if(event.keyCode == 13) {
        var alertMap = "[";
        for(i = 0; i < size/pixSize; i++){
            alertMap+="\n[";
            for(k = 0; k < size/pixSize; k++){
                alertMap+=""+Math.floor(world.map[i*pixSize][k*pixSize].elevation)+",";
            }
            alertMap+="],";
        }
        alertMap+="]";
        copyBox.innerHTML = alertMap;
    }
});
createGameScreen();
createInfoBox();
// generateMap();
world = generateContinents();
window.requestAnimationFrame(update);
// alert(map);