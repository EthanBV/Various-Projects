var gameScreen = document.createElement("CANVAS");
    gameScreen.id = "gameScreen";
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "rgba(0,0,0,0)";
    document.body.appendChild(gameScreen);

var map = [];
var plateBorders = [];
var plates;
var plateData = [];
var plateColors = [];
var plateType = [];
var plateVecs = [];
var size = 100;
var numPlates = 2;

//rework so plates drag tiles instead of having tiles!!!

function plate(){
    this.tiles = [];
    this.xCounter = 0;
    this.yCounter = 0;
}

function initateMap(){
    map = getNoiseMap(size);
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            map[i][k]*=10;
            map[i][k]+=95;
        }
    }
}

function generateModualPlates(){
    var PLATE_SPACING = 3;
    var plateCenters = [];
    var plateMap = [];
    for(i = 0; i < size; i++){
        var row = []
        for(k = 0; k < size; k++){
            var slot = [];
            for(j = 0; j < numPlates; j++){
                slot.push(-1);
            }
            row.push(slot);
        }
        plateMap.push(row);
    }
    
    for(i = 0; i < numPlates; i++){
        var redMult = Math.random();
        var greenMult = Math.random();
        var blueMult = Math.random();
        var red = Math.floor(redMult/(redMult+greenMult+blueMult)*400);
        var green = Math.floor(greenMult/(redMult+greenMult+blueMult)*400);
        var blue = Math.floor(blueMult/(redMult+greenMult+blueMult)*400);
        plateColors.push([red,green,blue]);
        plateType.push(Math.floor(Math.random()*2));
        plateVecs.push([Math.random()*2*Math.PI,Math.random()*0.5+0.5]);
        var x = Math.floor(Math.random()*size);
        var y = Math.floor(Math.random()*size);
        var plateSize = 5+Math.random()*15;
        for(var k in plateCenters){
            if(x < k[0]+PLATE_SPACING&&x > k[0]-plateSize&&y < k[1]+PLATE_SPACING&&y > k[1]-PLATE_SPACING)return;
        }
        plateCenters.push([x,y]);
        var points = [];
        for(k = plateSize; k>0; k--){
            points.push([y,x,size]);
            x+=1-Math.round(Math.random()*2);
            y+=1-Math.round(Math.random()*2);
        }
        for(k = 0; k<points.length; k++){
            if(points[k][0]<0)points[k][0]+=size;
            if(points[k][0]>=size)points[k][0]-=size;
            if(points[k][1]<0)points[k][1]+=size;
            if(points[k][1]>=size)points[k][1]-=size;
            if(plateMap[points[k][0]][points[k][1]][i]<points[k][2]){
                
                plateMap[points[k][0]][points[k][1]][i]=points[k][2];
                
                var loss = 0.7;
                //cardinals
                points.push([points[k][0]+1,points[k][1],points[k][2]*getLoss()]);
                points.push([points[k][0]-1,points[k][1],points[k][2]*getLoss()]);
                points.push([points[k][0],points[k][1]+1,points[k][2]*getLoss()]);
                points.push([points[k][0],points[k][1]-1,points[k][2]*getLoss()]);
                //diagonals
                points.push([points[k][0]+1,points[k][1]+1,points[k][2]*getLoss()/1.414]);
                points.push([points[k][0]-1,points[k][1]-1,points[k][2]*getLoss()/1.414]);
                points.push([points[k][0]+1,points[k][1]-1,points[k][2]*getLoss()/1.414]);
                points.push([points[k][0]-1,points[k][1]+1,points[k][2]*getLoss()/1.414]);
            }
        }
    }
    plates = [];
    for(i = 0; i < size; i++){
        var row = []
        for(k = 0; k < size; k++){
            var plateValue = 0;
            for(j = 1; j < numPlates; j++){
                if(plateMap[i][k][j]>plateMap[i][k][plateValue])plateValue = j;
            }
            row.push(plateValue);
        }
        plates.push(row);
    }
}

function initatePlates(){
    
    for(i = 0; i < numPlates; i++){
        plateData.push(new plate());
    }
        
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            if(plateType[plates[i][k]]==0)map[i][k]-=5;
            plateData[plates[i][k]].tiles.push([i,k]);
        }
    }
}

function getLoss(){
        return 0.5 + (Math.random()*0.3);
}

function calc(){
    var newMap = [];
    var vels = [];
    for(i = 0; i < size; i++){
            newMap.push([]);
            vels.push([]);
        for(k = 0; k < size; k++){
            newMap[i].push(100);
            vels[i].push([0,0]);
        }
    }
    
    for(i = 0; i < numPlates; i++){
        for(k = 0; k < plateData[i].tiles.length; k++){
            vels[plateData[i].tiles[k][0]][plateData[i].tiles[k][1]][0]=Math.max(Math.cos(plateVecs[i][0])*plateVecs[i][1],vels[plateData[i].tiles[k][0]][plateData[i].tiles[k][1]][0]);
            vels[plateData[i].tiles[k][0]][plateData[i].tiles[k][1]][1]=Math.max(Math.sin(plateVecs[i][0])*plateVecs[i][1],vels[plateData[i].tiles[k][0]][plateData[i].tiles[k][1]][1]);
            plateData[i].tiles[k][0]+=Math.round(Math.cos(plateVecs[i][0])*plateVecs[i][1]);
            plateData[i].tiles[k][1]+=Math.round(Math.sin(plateVecs[i][0])*plateVecs[i][1]);
            
            if(plateData[i].tiles[k][0]>=size)plateData[i].tiles[k][0]-=size;
            if(plateData[i].tiles[k][1]>=size)plateData[i].tiles[k][1]-=size;
            if(plateData[i].tiles[k][0]<0)plateData[i].tiles[k][0]+=size;
            if(plateData[i].tiles[k][1]<0)plateData[i].tiles[k][1]+=size;
        }
    }
    
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            var x = i+Math.round(vels[i][k][0]);
            var y = k+Math.round(vels[i][k][1]);
            console.log(vels[i][k][0]);
            console.log(vels[i][k][1]);
            if(x>=size)x-=size;
            if(y>=size)y-=size;
            if(x<0)x+=size;
            if(y<0)y+=size;
            newMap[x][y]=map[i][k];
        }
    }
    
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            map[i][k]=0;
        }
    }
    
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
           plates[i][k]=-1;
        }
    }
    
    for(i = 0; i < numPlates; i++){
        for(k = 0; k < plateData[i].tiles.length; k++){
            plates[plateData[i].tiles[k][0]][plateData[i].tiles[k][1]] = i;
        }
    }
    
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            map[i][k]=newMap[i][k]
        }
    }
}

function draw(){
    gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
   
    var ctx = gameScreen.getContext("2d");
    ctx.font = "7px Arial";
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){ 
                if(plates[i][k]==-1){
                    ctx.fillStyle = "rgb("+Math.floor(map[i][k])+","+Math.floor(map[i][k])+","+Math.floor(map[i][k])+")";
//                     ctx.fillStyle = "rgb(255,255,255)";
                } else ctx.fillStyle = "rgb("+Math.floor(plateColors[plates[i][k]][0]/255*map[i][k])+","+Math.floor(plateColors[plates[i][k]][1]/255*map[i][k])+","+Math.floor(plateColors[plates[i][k]][2]/255*map[i][k])+")";
                
                ctx.fillRect(30+i*07,30+k*7,7,7);
                ctx.fill();
//                 ctx.fillStyle="rgb(0,0,0)";
//                 ctx.fillText(""+plates[i][k],30+i*07,30+k*7+7);
        }
    }
} 



function update(){
    document.getElementById("counter").innerHTML = ""+(parseInt(document.getElementById("counter").innerHTML)+1);
    calc();
    draw();
    window.requestAnimationFrame(update);
}

initateMap();
generateModualPlates();
initatePlates();
window.requestAnimationFrame(update);