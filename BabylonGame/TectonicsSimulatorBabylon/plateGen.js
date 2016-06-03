function plate(color, xVel, yVel, centerPoints, elevation){
    this.tiles = [];
    this.xVel = xVel;
    this.yVel = yVel;
    this.xCounter = 0;
    this.yCounter = 0;
    this.color = color;
    this.elevation = elevation;
    this.centerPoints = centerPoints;
    //first land overlaps, then sea overlaps, then land-sea overlaps, then sea-land overlaps
    this.overlapingPlates = [];
    for(d = 0; d < numPlates; d++)this.overlapingPlates.push([[],[],[],[]]);
    this.tileMap = [];
    for(d = 0; d < size; d++){
        this.tileMap.push([]);
        for(f = 0; f < size; f++){
            this.tileMap[d][f] = null;
        }
    }
    this.overlaps = [];
    //first overlaps, then underlaps with each plate, both either true or false
    for(d = 0; d < numPlates; d++)this.overlaps.push([[],[]]);
}

function generateModualPlates(map){
    var PLATE_SPACING = 3;
    var plateCenters = [];
    var plateMap = [];
    var plates = [];
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
        var angle = Math.random()*2*Math.PI;
        var speed = Math.random()*0.3+0.2;
        var x = Math.floor(Math.random()*size);
        var y = Math.floor(Math.random()*size);
        var elevation = Math.random();
            var redMult = Math.random();
            var greenMult = Math.random();
            var blueMult = Math.random();
        var red = Math.floor(redMult/(redMult+greenMult+blueMult)*400);
        var green = Math.floor(greenMult/(redMult+greenMult+blueMult)*400);
        var blue = Math.floor(blueMult/(redMult+greenMult+blueMult)*400);
        var plateSize = 5+Math.random()*15;
//         for(var k in plateCenters){
//             if(x < k[0]+PLATE_SPACING&&x > k[0]-plateSize&&y < k[1]+PLATE_SPACING&&y > k[1]-PLATE_SPACING)return;
//         }
        plateCenters.push([x,y]);
        var points = [];
        for(k = plateSize; k>0; k--){
            points.push([x,y,size]);
            x+=1-Math.round(Math.random()*2);
            y+=1-Math.round(Math.random()*2);
        }
        plates.push(new plate([red,green,blue], Math.cos(angle)*speed, Math.sin(angle)*speed,points, elevation));
//         for(k = 0; k<points.length; k++){
//             if(points[k][0]<0)points[k][0]+=size;
//             if(points[k][0]>=size)points[k][0]-=size;
//             if(points[k][1]<0)points[k][1]+=size;
//             if(points[k][1]>=size)points[k][1]-=size;
//             if(plateMap[points[k][0]][points[k][1]][i]<points[k][2]){
                
//                 plateMap[points[k][0]][points[k][1]][i]=points[k][2];
                
//                 var loss = 0.7;
//                 //cardinals
//                 points.push([points[k][0]+1,points[k][1],points[k][2]*getLoss()]);
//                 points.push([points[k][0]-1,points[k][1],points[k][2]*getLoss()]);
//                 points.push([points[k][0],points[k][1]+1,points[k][2]*getLoss()]);
//                 points.push([points[k][0],points[k][1]-1,points[k][2]*getLoss()]);
//                 //diagonals
//                 points.push([points[k][0]+1,points[k][1]+1,points[k][2]*getLoss()/1.414]);
//                 points.push([points[k][0]-1,points[k][1]-1,points[k][2]*getLoss()/1.414]);
//                 points.push([points[k][0]+1,points[k][1]-1,points[k][2]*getLoss()/1.414]);
//                 points.push([points[k][0]-1,points[k][1]+1,points[k][2]*getLoss()/1.414]);
//             }
//         }
    }
    
//     for(i = 0; i < size; i++){
//         for(k = 0; k < size; k++){
//             var plateValue = 0;
//             for(j = 1; j < numPlates; j++){
//                 if(plateMap[i][k][j]>plateMap[i][k][plateValue])plateValue = j;
//             }
//             plates[plateValue].tiles.push(map[i][k]);
//         }
//     }
    
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            var plateValue = 0;
            var plateDist = size*2;
            for(j = 0; j < numPlates; j++){
                for(l = 0; l < plates[j].centerPoints.length; l++){
                    var dist = Math.sqrt((plates[j].centerPoints[l][0]-i)*(plates[j].centerPoints[l][0]-i)+(plates[j].centerPoints[l][1]-k)*(plates[j].centerPoints[l][1]-k));
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i-size)*(plates[j].centerPoints[l][0]-i-size)+(plates[j].centerPoints[l][1]-k)*(plates[j].centerPoints[l][1]-k)));
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i)*(plates[j].centerPoints[l][0]-i)+(plates[j].centerPoints[l][1]-k-size)*(plates[j].centerPoints[l][1]-k-size)));
                    
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i+size)*(plates[j].centerPoints[l][0]-i+size)+(plates[j].centerPoints[l][1]-k)*(plates[j].centerPoints[l][1]-k)));
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i)*(plates[j].centerPoints[l][0]-i)+(plates[j].centerPoints[l][1]-k+size)*(plates[j].centerPoints[l][1]-k+size)));
                    
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i-size)*(plates[j].centerPoints[l][0]-i-size)+(plates[j].centerPoints[l][1]-k-size)*(plates[j].centerPoints[l][1]-k-size)));
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i+size)*(plates[j].centerPoints[l][0]-i+size)+(plates[j].centerPoints[l][1]-k+size)*(plates[j].centerPoints[l][1]-k+size)));
                    
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i+size)*(plates[j].centerPoints[l][0]-i+size)+(plates[j].centerPoints[l][1]-k-size)*(plates[j].centerPoints[l][1]-k-size)));
                    dist = Math.min(dist, Math.sqrt((plates[j].centerPoints[l][0]-i-size)*(plates[j].centerPoints[l][0]-i-size)+(plates[j].centerPoints[l][1]-k+size)*(plates[j].centerPoints[l][1]-k+size)));
                    if(plateDist>dist){
                        plateValue = j;
                        plateDist = dist;
                    }
                }
            }
            map[i][k].plate = plates[plateValue];
            plates[plateValue].tiles.push(map[i][k]);
        }
    }
    
    return plates;
}

function getLoss(){
        return 0.5 + (Math.random()*0.3);
}
