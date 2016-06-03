var gameScreen = document.createElement("CANVAS");
gameScreen.style.position = "absolute";
gameScreen.style.left = "0px";
gameScreen.style.top = "0px";
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.backgroundColor = "rgba(25,25,25,1)";

document.body.appendChild(gameScreen);
var context = gameScreen.getContext("2d");
var playerImg = document.createElement("IMG");
var mouseDx = 0;
var mouseDy = 0;
playerImg.src = "https://github.com/nxbt/dungeon-game/blob/master/core/assets/Person.png?raw=true";
var player = {
    eyeLevel: 5,
    zCenter: -1000,
    yCenter: this.eyeLevel,
    xCenter: 0,
    xAngle: 0,
    yAngle: 0,
    dx: 0,
    dz: 0,
    dy: 0,
    sprite: playerImg,
    move: function(left, right, down, up) {
        var vel = 0.1;
        var forwards = 0;
        var sideways = 0;
        if(left) sideways--;
        if(right) sideways++;
        if(down) forwards--;
        if(up) forwards++;
        if(sideways !== 0 || forwards !== 0) {
            var angle = Math.atan2(forwards, sideways) - this.xAngle;
            this.dz -= Math.sin(angle) * vel;
            this.dx -= Math.cos(angle) * vel;
        }
    },
    jump: function() {
        this.dy = 0.35;
    },
    update: function() {
        var left = false;
        var right = false;
        var up = false;
        var down = false;
        if(keys[37]) {
            player.xAngle -= 0.05;
            if(this.xAngle < -Math.PI)this.xAngle+=Math.PI*2;
        }
        if(keys[39]) {
            player.xAngle += 0.05;
            if(this.xAngle > Math.PI)this.xAngle-=Math.PI*2;
        }
        if(keys[38]) {
            player.yAngle += 0.05;
            if(this.yAngle > Math.PI/2)this.yAngle = Math.PI/2;
        }
        if(keys[40]) {
            player.yAngle -= 0.05;
            if(this.yAngle < -Math.PI/2)this.yAngle = -Math.PI/2;
        }
        if(keys[32] && this.yCenter == this.eyeLevel) {
            player.jump();
        }
        if(keys[65]) {
            left = true;
        }
        if(keys[68]) {
            right = true;
        }
        if(keys[87]) {
            up = true;
        }
        if(keys[83]) {
            down = true;
        }
        this.move(left, right, down, up);
        
        if(mouseDx != 0){
            this.xAngle += mouseDx/1000;
            mouseDx = 0;
            if(this.xAngle > Math.PI)this.xAngle-=Math.PI*2;
            if(this.xAngle < -Math.PI)this.xAngle+=Math.PI*2;
        }
        if(mouseDy != 0){
            this.yAngle -= mouseDy/1000;
            console.log(Math.sign(mouseDy));
            mouseDy = 0;
            if(this.yAngle > Math.PI/2)this.yAngle = Math.PI/2;
            if(this.yAngle < -Math.PI/2)this.yAngle = -Math.PI/2;
        }
        if(this.yCenter > this.eyeLevel) this.dy -= 0.03;
        else {
            this.yCenter = this.eyeLevel;
            if(this.dy <= 0) this.dy = 0;
        }
        var angle = Math.atan2(this.dz, this.dx);
        var vel = Math.sqrt(this.dz * this.dz + this.dx * this.dx);
        vel *= 0.85;
        this.dz = Math.sin(angle) * vel;
        this.dx = Math.cos(angle) * vel;
        if(Math.abs(this.dx) < 0.01) this.dx = 0;
        if(Math.abs(this.dz) < 0.01) this.dz = 0;
        this.xCenter += this.dx;
        this.yCenter += this.dy;
        this.zCenter += this.dz;
    },
    drawMinMap: function(){
       context.save();
       context.translate(100,100);
       context.rotate(-this.xAngle-Math.PI/2);
       context.drawImage(this.sprite, -5,-5, 10, 10);
       context.restore();
    }
};
var fov = 1000;
var treeImg = document.createElement("IMG");
treeImg.src = "http://vignette2.wikia.nocookie.net/herebemonsters/images/4/48/Pine-Tree-Sprite.png/revision/latest?cb=20140329010041";
var moonImg = document.createElement("IMG");
moonImg.src = "https://4yelda.blu.livefilestore.com/y2pLKppK7qXZxYfUDEIkQEwnGaRZ_dZ5BGKam8iqoOovojlBvr7BUPFf2Vebr8KbGKqnkhevAo50NKkpdTzvScxnlCpTht3MBEPoUuTVrA9Sg0/FullMoon2010.pngpsid=1.png";


function tree(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.sprite = treeImg;
    this.draw = function() {
        var pos = getPos(this.x, this.y, this.z);
        var x2d = pos[0];
        var y2d = pos[1];
        if(pos[2] > -fov) {
            context.drawImage(this.sprite, x2d - 10000 / pos[3] / 2, y2d - 20000 / pos[3] * 0.9, 10000 / pos[3], 20000 / pos[3]);
        }
    };
    this.drawMinMap = function(){
       if(Math.abs(this.x+player.xCenter) < 100&&Math.abs(this.z+(player.zCenter+fov)) < 100)context.drawImage(this.sprite, 100-(this.x+player.xCenter)-2.5,100-(this.z+(player.zCenter+fov))-5, 5, 10);
    };
    this.update = function(){
        
    };
}



function side(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
    this.x3 = x3;
    this.y3 = y3;
    this.z3 = z3;
    this.x4 = x4;
    this.y4 = y4;
    this.z4 = z4;
    this.x = (this.x1 + this.x2 + this.x3 + this.x4)/4;
    this.y = (this.y1 + this.y2 + this.y3 + this.y4)/4;
    this.z = (this.z1 + this.z2 + this.z3 + this.z4)/4;
    this.color = color;
    this.draw = function() {
        var pos1 = getPos(this.x1,this.y1,this.z1);
        var pos2 = getPos(this.x2,this.y2,this.z2);
        var pos3 = getPos(this.x3,this.y3,this.z3);
        var pos4 = getPos(this.x4,this.y4,this.z4);
        var pos5 = getPos(this.x,this.y,this.z);
        if(pos1[2] > -fov &&pos2[2] > -fov&&pos3[2] > -fov&&pos4[2] > -fov){
            context.fillStyle = this.color;
            context.strokeStyle = "rgb(0,0,0)";
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(pos1[0],pos1[1]);
            context.lineTo(pos2[0],pos2[1]);
            context.lineTo(pos3[0],pos3[1]);
            context.lineTo(pos4[0],pos4[1]);
            context.lineTo(pos1[0],pos1[1]);
            context.fill();
            context.stroke();
        }
    };
    this.drawMinMap = function(){
//        if(Math.abs(this.x+player.xCenter) < 100&&Math.abs(this.z+(player.zCenter+fov)) < 100)context.drawImage(this.sprite, 100-(this.x+player.xCenter)-2.5,100-(this.z+(player.zCenter+fov))-5, 5, 10);
    };
    this.update = function(){
        
    };
}

function box(x,y,z,width,height,depth, color){
    this.x = x+width/2;
    this.y = y-height/2;
    this.z = z+depth/2;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.sides = [];
    this.sides.push(new side(x,y,z,
                             x+width,y,z,
                             x+width,y-height,z,
                             x,y-height,z,
                            color));
    this.sides.push(new side(x,y,z,
                             x,y,z+depth,
                             x,y-height,z+depth,
                             x,y-height,z,
                            color));
    this.sides.push(new side(x+width,y,z,
                             x+width,y,z+depth,
                             x+width,y-height,z+depth,
                             x+width,y-height,z,
                            color));
    this.sides.push(new side(x,y,z+depth,
                             x+width,y,z+depth,
                             x+width,y-height,z+depth,
                             x,y-height,z+depth,
                            color));
    this.sides.push(new side(x,y,z,
                             x,y,z+depth,
                             x+width,y,z+depth,
                             x+width,y,z,
                            color));
    this.sides.push(new side(x,y-height,z,
                             x,y-height,z+depth,
                             x+width,y-height,z+depth,
                             x+width,y-height,z,
                            color));
    this.draw = function(){
        var pos = getPos(this.x,this.y,this.z);
        if(pos[2]>-fov){
            sortByDistance(this.sides);
            var k = this.sides.length;
            while(k--){
                this.sides[k].draw();
            }  
        }
    };
    this.drawMinMap = function(){
        
    }
    this.update = function(){
        
    };
    
}

function bush(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.boxes = [];
    this.boxes.push(new box(x-0.5,y,z-0.5,1,1,1, "rgb(100,100,0)"));
    this.boxes.push(new box(x-1.5,y-1,z-1.5,3,3,3, "rgb(0,150,0)"));
    this.draw = function(){
        var pos = getPos(this.x,this.y,this.z);
        if(pos[2]>-fov){
            sortByDistance(this.boxes);
            var j = this.boxes.length;
            while(j--){
                this.boxes[j].draw();
            }  
        }
    };
    this.drawMinMap = function(){
        
    };
    this.update = function(){
        
    };
}

function sun(){
    this.x = 0;
    this.y = -1000;
    this.z = 0;
    this.draw = function(){
        var pos = getPos(this.x,this.y,this.z);
        var x2d = pos[0];
        var y2d = pos[1];
        if(pos[2] >= -fov&&this.y < 0) {
            context.fillStyle = "rgb(255,255,0)";
            context.beginPath();
            context.arc(x2d,y2d,50000 / pos[3],0,Math.PI*2);
            context.fill();
        }
        
    };
    
    this.drawMinMap = function(){
        
    };
    this.update = function(){
        
    };
}

function moon(){
    var dist = Math.random()*1000;
    var angle = Math.random()*Math.PI*2;
    this.x = Math.cos(angle)*dist;
    this.z = Math.sin(angle)*dist;
    this.y = -1000+dist;
    this.sprite = moonImg;
    this.draw = function(){
        var pos = getPos(this.x,this.y,this.z);
        var x2d = pos[0];
        var y2d = pos[1];
        if(pos[2] >= -fov&&this.y < 0) {
            context.drawImage(this.sprite,x2d,y2d,100000 / pos[3],100000 / pos[3]);
        }
        
    };
    
    this.drawMinMap = function(){
        
    };
    this.update = function(){
        
    };
}

function star(){
    this.sizeMultiplier = 0.3+Math.random()*1.7;
    this.brightness = 3000+Math.random()*4000;
    this.dBrightness = 30+Math.random()*30;
    var dist = Math.random()*10000;
    var angle = Math.random()*Math.PI*2;
    this.x = Math.cos(angle)*dist;
    this.z = Math.sin(angle)*dist;
    this.y = -10000+dist;
    this.draw = function(){
        var pos = getPos(this.x,this.y,this.z);
        var x2d = pos[0];
        var y2d = pos[1];
        if(pos[2] >= -fov&&this.y < 0) {
            context.fillStyle = "rgb(255,255,255)";
            context.beginPath();
            context.arc(x2d,y2d,this.brightness*this.sizeMultiplier / pos[3],0,Math.PI*2);
            context.fill();
        }
        
    };
    
    this.drawMinMap = function(){
        
    };
    this.update = function(){
        this.brightness+=this.dBrightness;
        if(this.brightness > 7000||this.brightness < 3000)this.dBrightness*=-1;
    };
}

function shootingStar(){
    this.dx = Math.sin(0.5-Math.random())*(50+Math.random()*100);
    this.dy = Math.sin(0.5-Math.random())*(50+Math.random()*100);
    this.dz = Math.sin(0.5-Math.random())*(50+Math.random()*100);
    this.sizeMultiplier = 0.3+Math.random()*1.7;
    this.brightness = 0;
    this.dBrightness = 300;
    var dist = Math.random()*100000;
    var angle = Math.random()*Math.PI*2;
    this.x = Math.cos(angle)*dist;
    this.z = Math.sin(angle)*dist;
    this.y = -10000+dist;
    this.draw = function(){
        var pos = getPos(this.x,this.y,this.z);
        var x2d = pos[0];
        var y2d = pos[1];
        if(pos[2] >= -fov&&this.y < 0) {
            context.fillStyle = "rgb(255,255,255)";
            context.beginPath();
            context.arc(x2d,y2d,this.brightness*this.sizeMultiplier / pos[3],0,Math.PI*2);
            context.fill();
        }
        
    };
    
    this.drawMinMap = function(){
        
    };
    this.update = function(){
        this.x+=this.dx;
        this.y+=this.dy;
        this.z+=this.dz;
        this.brightness+=this.dBrightness;
        this.dBrightness = Math.sign(this.dBrightness)*(8000-this.brightness)/10;
        if(this.brightness > 7000)this.dBrightness*=-1;
        if(this.brightness < 0)obs.splice(obs.indexOf(this),1);
    };
}

function planet(){
    this.sizeMultiplier = 0.8+Math.random()*1.7;
    this.brightness = 4000+Math.random()*5000;
    this.dBrightness = 30+Math.random()*30;
    var dist = Math.random()*100000;
    var angle = Math.random()*Math.PI*2;
    this.x = Math.cos(angle)*dist;
    this.z = Math.sin(angle)*dist;
    this.y = -10000+dist;
    this.draw = function(){
        var pos = getPos(this.x,this.y,this.z);
        var x2d = pos[0];
        var y2d = pos[1];
        if(pos[2] >= -fov&&this.y < 0) {
            context.fillStyle = "rgb(250,230,100)";
            context.beginPath();
            context.arc(x2d,y2d,this.brightness*this.sizeMultiplier / pos[3],0,Math.PI*2);
            context.fill();
        }
        
    };
    
    this.drawMinMap = function(){
        
    };
    this.update = function(){
        this.brightness+=this.dBrightness;
        if(this.brightness > 5000||this.brightness < 4000)this.dBrightness*=-1;
    };
}
// var obs = [];
// for(i = 0; i < 100; i++) {
//     obs.push(new tree(500 - Math.random() * 1000, 0, 500 - Math.random() * 1000));
// }
var obs = [];
for(i = 0; i < 2000; i++) {
    obs.push(new tree(500 - Math.random() * 1000, 0, 500 - Math.random() * 1000));
    obs.push(new star());
    if(Math.random()>0.9)obs.push(new planet());
//     if(Math.random()>0.95)obs.push(new box(500 - Math.random() * 1000, 0, 500 - Math.random() * 1000,Math.random()*10,Math.random()*10,Math.random()*10, "rgb(100,100,100)"));
//     if(Math.random()>0.95)obs.push(new bush(500 - Math.random() * 1000, 0, 500 - Math.random() * 1000));
}

// obs.push(new sun());
obs.push(new moon());
function render() {
    player.update();
    obs.push(new shootingStar());
    obs.push(new shootingStar());
    obs.push(new shootingStar());
    for(i = 0; i < obs.length; i++){
        obs[i].update();
    }
    // clear the canvas
    context.clearRect(0, 0, gameScreen.width, gameScreen.height);
    context.strokeStyle = "rgb(0,100,0)";
    context.fillStyle = "rgb(0,100,0)";
    context.lineSize = 10;
    context.beginPath();
    var horizonX = 0;
    var horizonZ = 0;
    var horizonY = 0;
    for(i = -Math.PI/8; i < Math.PI*9/8; i += Math.PI / 32) {
        horizonZ = Math.sin(i) * 1000 - player.zCenter;
        horizonX = Math.cos(i) * 1000 - player.xCenter;
        pos = getPos(horizonX, horizonY, horizonZ, true);
        context.lineTo(pos[0], pos[1]);
    }
    context.lineTo(0, gameScreen.height);
    context.lineTo(gameScreen.width, gameScreen.height);
    context.fill();
    sortByDistance(obs);
    var i = obs.length;
    while(i--) {
        obs[i].draw();
    }
    
    context.fillStyle = "rgb(0,255,0)";
    context.strokeStyle = "rgb(155,155,155)";
    context.lineWidth = 5;
    context.beginPath()
    context.rect(0,0,200,200);
    context.fill();
    context.stroke();
    var i = obs.length;
    while(i--) {
        obs[i].drawMinMap();
    }
    player.drawMinMap();
    window.requestAnimationFrame(render);
}

function getPos(x, y, z, horizon) {
    z += player.zCenter;
    x += player.xCenter;
    y += player.yCenter;
    var xDist = Math.sqrt(x * x + (z + fov) * (z + fov));
    var dist = Math.sqrt(xDist * xDist + y * y);
    var xPixAngle = Math.atan2(z + fov, x);
    var yPixAngle = Math.atan2(y, xDist);
    xPixAngle += player.xAngle;
    yPixAngle += player.yAngle;
    y = Math.sin(yPixAngle) * dist;
    if(!horizon) {
        x = Math.cos(xPixAngle) * xDist;
        z = Math.sin(xPixAngle) * xDist - fov;
    }
    // here's the 3D to 2D formula, first work out 
    // scale for that pixel's z position (distance from 
    // camera)
    var scale = fov / (fov + z);
    // and multiply our 3D x and y to get our
    // 2D x and y. Add halfWidth and halfHeight
    // so that our 2D origin is in the middle of 
    // the screen.
    var x2d = (x * scale) + gameScreen.width / 2;
    var y2d = (y * scale) + gameScreen.height / 2;
    return [x2d, y2d, z, dist];
}
var keys = [];
onkeydown = onkeyup = function(e) {
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
};

function sortByDistance(arr){
    arr.sort(function(a, b) {
        var aZ = a.z + player.zCenter;
        var aX = a.x + player.xCenter;
        var aY = a.y + player.yCenter;
        var aDist = Math.sqrt(aX * aX + (aZ + fov) * (aZ + fov));
        aDist = Math.sqrt(aDist * aDist + aY * aY);
        var bZ = b.z + player.zCenter;
        var bX = b.x + player.xCenter;
        var bY = b.y + player.yCenter;
        var bDist = Math.sqrt(bX * bX + (bZ + fov) * (bZ + fov));
        bDist = Math.sqrt(bDist * bDist + bY * bY);
        return aDist - bDist;
    });
}

gameScreen.requestPointerLock = gameScreen.requestPointerLock ||
        gameScreen.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock;
    
    gameScreen.onclick = function() {
        gameScreen.requestPointerLock();
    };

document.addEventListener("mousemove", function(e){
    mouseDx += e.movementX ||
            e.mozMovementX      ||
            0;

    mouseDy += e.movementY ||
            e.mozMovementY      ||
            0;
});


window.requestAnimationFrame(render);