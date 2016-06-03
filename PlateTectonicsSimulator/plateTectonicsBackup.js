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
var numPlates = 10;

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

function generatePlates(){
    var originX;
    var originY;
    var originAngle;
    var x;
    var y;
    var angle;
    var xCounter;
    var yCounter;
    for(i = 0; i < 20; i++){
        x = Math.round(Math.random()*size);
        y = Math.round(Math.random()*size);
        angle = Math.random()*2*Math.PI;
        originX = x;
        originY = y;
        originAngle = angle;
        xCounter = 0;
        yCounter = 0;
        var edge = [];
        line_loop:
        for(k = 0; k < 1000000; k++){
            
            if(edge.length<1||(edge[edge.length-1][0]!=x||edge[edge.length-1][1]!=y))edge.push([x,y]);
            for(j = 0; j < plateBorders.length; j++){
                for(l = 0; l < plateBorders[j].length; l++){
                    if(plateBorders[j][l][0]==x&&plateBorders[j][l][1]==y){
                        break line_loop;
                    }
                }
            }
            if(edge.length<1||(edge[edge.length-1][0]!=x||edge[edge.length-1][1]!=y)){
                for(j = 0; j < edge.length-1; j++){
                    if(edge[j][0]==x&&edge[j][1]==y){
                        break line_loop;
                    }
                }    
            }
            
            xCounter+=Math.cos(angle);
            yCounter+=Math.sin(angle);
            if(xCounter > 1){
                if(yCounter > 1){
                    if(yCounter > xCounter){
                        y++;
                        yCounter--;
                    }else{
                        x++;
                        xCounter--;
                    }
                }else{
                    x++;
                    xCounter--;
                }
            }else if(yCounter > 1){
                y++;
                yCounter--;
            }else if(xCounter < 1){
                if(yCounter < 1){
                    if(yCounter < xCounter){
                        y--;
                        yCounter++;
                    }else{
                        x--;
                        xCounter++;
                    }
                }else{
                    x--;
                    xCounter++;
                }
            }else if(yCounter < 1){
                y--;
                yCounter++;
            }
            angle+=(Math.PI*2)/30-(Math.random()*Math.PI*2)/15; 
            if(x>size){
                plateBorders.push(edge);
                edge = [];
                x-=size+1;
            }
            if(y>size){
                plateBorders.push(edge);
                edge = [];
                y-=size+1;
            }
            if(x<0){
                plateBorders.push(edge);
                edge = [];
                x+=size+1;
            }
            if(y<0){
                plateBorders.push(edge);
                edge = [];
                y+=size+1;
            }
        }
        plateBorders.push(edge);
        x = originX;
        y = originY;
        angle = 360-originAngle;
        xCounter = 0;
        yCounter = 0;
        var edge = [];
        line_loop:
        for(k = 0; k < 1000000; k++){
            
            if(edge.length<1||(edge[edge.length-1][0]!=x||edge[edge.length-1][1]!=y))edge.push([x,y]);
            if(edge.length>1)for(j = 0; j < plateBorders.length; j++){
                for(l = 0; l < plateBorders[j].length; l++){
                    if(plateBorders[j][l][0]==x&&plateBorders[j][l][1]==y){
                        break line_loop;
                    }
                }
            }
            if(edge.length<1||(edge[edge.length-1][0]!=x||edge[edge.length-1][1]!=y)){
                for(j = 0; j < edge.length-1; j++){
                    if(edge[j][0]==x&&edge[j][1]==y){
                        break line_loop;
                    }
                }    
            }
            
            xCounter+=Math.cos(angle);
            yCounter+=Math.sin(angle);
            if(xCounter > 1){
                if(yCounter > 1){
                    if(yCounter > xCounter){
                        y++;
                        yCounter--;
                    }else{
                        x++;
                        xCounter--;
                    }
                }else{
                    x++;
                    xCounter--;
                }
            }else if(yCounter > 1){
                y++;
                yCounter--;
            }else if(xCounter < 1){
                if(yCounter < 1){
                    if(yCounter < xCounter){
                        y--;
                        yCounter++;
                    }else{
                        x--;
                        xCounter++;
                    }
                }else{
                    x--;
                    xCounter++;
                }
            }else if(yCounter < 1){
                y--;
                yCounter++;
            }
            angle+=(Math.PI*2)/30-(Math.random()*Math.PI*2)/15; 
            if(x>size){
                plateBorders.push(edge);
                edge = [];
                x-=size+1;
            }
            if(y>size){
                plateBorders.push(edge);
                edge = [];
                y-=size+1;
            }
            if(x<0){
                plateBorders.push(edge);
                edge = [];
                x+=size+1;
            }
            if(y<0){
                plateBorders.push(edge);
                edge = [];
                y+=size+1;
            }
        }
        plateBorders.push(edge);
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
            plateData[plates[i][k]].tiles.push([i,k,map[i][k]]);
        }
    }
}

function getLoss(){
        return 0.5 + (Math.random()*0.3);
    }

function calc(){
    var type;
    var angle;
    var vel;
    for(i = 0; i < numPlates; i++){
        type = plateType[i];
        angle = plateVecs[i][0];
        vel = plateVecs[i][1];
        plateData[i].xCounter+=Math.cos(angle)*vel;
        plateData[i].yCounter+=Math.sin(angle)*vel;
        for(k = 0; k < plateData[i].tiles.length; k++){
            var move = true;
            for(j = 0; j < numPlates; j++){
                if(i!=j){
                    for(l = 0; l < plateData[j].tiles.length; l++){
                        if(plateData[i].tiles[k][0]==plateData[j].tiles[l][0]&&plateData[i].tiles[k][1]==plateData[j].tiles[l][1]){
                            if(type == 1 && plateType[j] == 0){
                                plateData[i].tiles[k][2]+=5;
                            }
                            
                            if(type == 0 && plateType[j] == 1){
                                plateData[i].tiles[k][2]-=5;
                            }
                            
                            if(type == 1 && plateType[j] == 1){
                                plateData[i].tiles[k][2]+=10;
                            }
                            
                            if(type == 0 && plateType[j] == 0){
                                plateData[i].tiles[k][2]+=5;
                            }
                        }
                    } 
                }
            }
            if(move){
                plateData[i].tiles[k][0]+=Math.round(plateData[i].xCounter);
                plateData[i].tiles[k][1]+=Math.round(plateData[i].yCounter);
                if(plateData[i].tiles[k][0]>=size)plateData[i].tiles[k][0]-=size;
                if(plateData[i].tiles[k][1]>=size)plateData[i].tiles[k][1]-=size;
                if(plateData[i].tiles[k][0]<0)plateData[i].tiles[k][0]+=size;
                if(plateData[i].tiles[k][1]<0)plateData[i].tiles[k][1]+=size;
            }
            
        }
        plateData[i].xCounter = plateData[i].xCounter-Math.round(plateData[i].xCounter);
        plateData[i].yCounter = plateData[i].yCounter-Math.round(plateData[i].yCounter);
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
            map[plateData[i].tiles[k][0]][plateData[i].tiles[k][1]] = plateData[i].tiles[k][2];
            plates[plateData[i].tiles[k][0]][plateData[i].tiles[k][1]] = i;
        }
    }
}

function draw(){
    gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
   
    var ctx = gameScreen.getContext("2d");
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){ 
                if(plates[i][k]==-1){
                    ctx.fillStyle = "rgb(0,0,0)";
                } else ctx.fillStyle = "rgb("+Math.floor(plateColors[plates[i][k]][0]/255*map[i][k])+","+Math.floor(plateColors[plates[i][k]][1]/255*map[i][k])+","+Math.floor(plateColors[plates[i][k]][2]/255*map[i][k])+")";
                
                ctx.fillRect(30+i*07,30+k*7,7,7);
                ctx.fill();
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