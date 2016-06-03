function tile(x, y, elevation, age){
    this.elevation = elevation;
    this.plate = null;
    this.x = x;
    this.y = y;
    this.counter = 3;
    this.age = age;
}

function world(){
    this.plates = [];
    this.map = [];
    this.hotSpots = [];
}

function hotSpot(){
    this.x = Math.floor(Math.random()*size);
    this.y = Math.floor(Math.random()*size);
    this.radius = 5;
    this.baseStrength = 4+Math.floor(Math.random()*2)
    this.strength = this.baseStrength*Math.random()*2;
    while(Math.abs(this.baseStrength - this.strength)<this.baseStrength/2)this.strength = this.baseStrength*Math.random()*2;
    this.strengthChange = 0;
    this.periodLength = 0.1+Math.random()*0.3;
    this.age = 0;
    this.maxAge = 100+Math.floor(Math.random()*500);
    this.dx = 0.1-Math.random()*0.2;
    this.dy = 0.1-Math.random()*0.2;
    this.xCounter = 0;
    this.yCounter = 0;
}

function generateContinents(){
    var tempWorld = new world();
    var noise = new noise2d(size, 20);
    var noise2 = new noise2d(size, 10);
    var noise3 = new noise2d(size, 50);
    var noise4 = new noise2d(size, 5);
    for(i = 0; i < size; i++){
        tempWorld.map.push([]);
        for(k = 0; k < size; k++){
            tempWorld.map[i].push(new tile(i,k,255*(0.5*Math.pow(noise.getPointTri2(i,k),2)+0.1*Math.pow(noise4.getPointTri2(i,k),1)+0.1*Math.pow(noise2.getPointTri2(i,k),1)+0.3*Math.pow(noise3.getPointTri2(i,k),3/5)),0));
//             tempWorld.map[i].push(new tile(i,k,0,0));
//             map[i].push(100);
        }
    }
    
    for(i = 0; i < numHotSpots; i++){
        tempWorld.hotSpots.push(new hotSpot());   
    }
    
    tempWorld.plates = generateModualPlates(tempWorld.map);
    for(i = 0; i < tempWorld.plates.length; i++){
        for(k = i; k < tempWorld.plates.length; k++){
            if(tempWorld.plates[i].elevation>tempWorld.plates[k].elevation){
                var tempPlate = tempWorld.plates[k];
                tempWorld.plates[k] = tempWorld.plates[i]
                tempWorld.plates[i] = tempPlate;
            }
        }
    }
    for(i = 0; i < tempWorld.plates.length; i++){
        console.log(tempWorld.plates[i].elevation);
    }
    return tempWorld;
    
    
    
}

function noise2d(width, magnitude){
    
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
