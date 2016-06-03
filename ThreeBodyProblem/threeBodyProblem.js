var constant = 1;
var speed = 1;
var pause = false;
var totalDx;
var totalDy;
var totalAngle;
var totalVel;
var totalMass;
var centerOfMassX;
var centerOfMassY;
var creatingBody = false;
var settingVelocity = false;
var bodyX;
var bodyY;
var bodyColor;
var bodyMass;
var bodyDx;
var bodyDy;
var cursorX;
var cursorY;


var camX = 0;
var camY = 0;

var zoom = 1;

var trackedBody = 0;

var FREE = 0
var CENTER = 1
var TRACKINGBODY = 2;
var camState = FREE;

document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
}

var traceScreen = document.createElement("CANVAS");
    traceScreen.id = "gameScreen";
    traceScreen.style.position = "absolute";
    traceScreen.style.left = "0px";
    traceScreen.style.top = "0px";
    traceScreen.width = window.innerWidth;
    traceScreen.height = window.innerHeight;
    traceScreen.style.backgroundColor = "rgba(0,0,0,1)";
    document.body.appendChild(traceScreen);
var gameScreen = document.createElement("CANVAS");
    gameScreen.id = "gameScreen";
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "rgba(0,0,0,0)";
    document.body.appendChild(gameScreen);

var drawScreen = document.createElement("CANVAS");
    drawScreen.id = "gameScreen";
    drawScreen.style.position = "absolute";
    drawScreen.style.left = "0px";
    drawScreen.style.top = "0px";
    drawScreen.width = window.innerWidth;
    drawScreen.height = window.innerHeight;
    drawScreen.style.backgroundColor = "rgba(0,0,0,0)";
    drawScreen.addEventListener("mousedown", click);
    document.body.appendChild(drawScreen);

var totalVelCoutner = document.createElement("P");
    
    totalVelCoutner.style.position = "absolute";
    totalVelCoutner.style.left = "0px";
    totalVelCoutner.style.top = "0px";
    totalVelCoutner.style.width = "200px";
    totalVelCoutner.style.height = "60px";
    totalVelCoutner.style.backgroundColor = "rgba(0,0,0,0)";
    totalVelCoutner.style.color = "rgb(255,255,255)";
    document.body.appendChild(totalVelCoutner);





function Body(x, y, mass, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.dx = dx;
    this.dy = dy;
    this.color = color
//     this.update = new function(){
//     }
}



var bodies = [];

var stableThreeBodyProblems = [
    [
        new Body(550,500,10,0,-1,"rgb(0,100,100)"),
        new Body(565,500,10,0,1,"rgb(100,0,100)"),
        new Body(580,500,10,0,0,"rgb(100,100,0)")
    ],
    [
        new Body(300,500,1000,0,-11.5,"rgb(0,100,100)"),
        new Body(500,500,1000,0,11.5,"rgb(100,0,100)"),
        new Body(700,500,1000,0,0,"rgb(100,100,0)")
    ],
    [
        new Body(300,500,1000,Math.cos(Math.PI*4/3)*10,-Math.sin(Math.PI*4/3)*10,"rgb(0,100,100)"),
        new Body(500,500,1000,Math.cos(Math.PI*2/3)*10,-Math.sin(Math.PI*2/3)*10,"rgb(100,0,100)"),
        new Body(400,500+Math.sin(1.0471975512)*200,1000,Math.cos(0)*10,Math.sin(0)*10,"rgb(100,100,0)")
    ]
];

function generateStableThreeBodySystem(){
    bodies = stableThreeBodyProblems[Math.floor(stableThreeBodyProblems.length*Math.random())];
}

function generateLastStableSystem(){
    bodies = stableThreeBodyProblems[stableThreeBodyProblems.length-1];
}

function generateGalaxy(){
    var totalMass = (5*100*100)/2;
    for(k = 0; k < 5; k++){
        var angle = Math.random()*(2*Math.PI);
        var distance = Math.pow(Math.random(),2)*gameScreen.height*100;
        var xOffset = Math.cos(angle)*distance;
        var yOffset = Math.sin(angle)*distance;
        var speed = Math.sqrt(totalMass*constant)*((distance)/(gameScreen.height*100));
//         alert(speed);
        generateSystem(gameScreen.width/2+xOffset,gameScreen.height/2+yOffset,Math.cos(angle+90)*speed,Math.sin(angle+90)*speed,100,100,1);
    }

    zoom = 0.002;
}

function generateSystem(x, y, dx, dy, amount, mass, volume){
    var totalMass = mass*amount/2;
    for(i = 0; i < amount; i++){
        var angle = Math.random()*(2*Math.PI);
        var distance = Math.pow(Math.random(),2)*(gameScreen.height*volume-mass)+mass;
        var xOffset = Math.cos(angle)*distance;
        var yOffset = Math.sin(angle)*distance;
        var speed = constant*Math.sqrt(totalMass*constant/distance)*((distance)/(gameScreen.height*volume));
        
        
        
         
//         var xOffset = Math.random()*gameScreen.height-gameScreen.height/2;
//         var yOffset = Math.random()*gameScreen.height-gameScreen.height/2;
        bodies.push(new Body(x+gameScreen.width/2+xOffset,y+gameScreen.height/2+yOffset,Math.random()*mass,dx+Math.cos(angle+90)*speed,dy+Math.sin(angle+90)*speed,"rgb("+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+")"));
    }
    zoom = 1/(2*volume);
}

function generateStaticGalaxy(){
    var totalMass = (5*100*100)/2;
    for(k = 0; k < 10; k++){
        var angle = Math.random()*(2*Math.PI);
        var distance = Math.pow(Math.random(),2)*gameScreen.height*100;
        var xOffset = Math.cos(angle)*distance;
        var yOffset = Math.sin(angle)*distance;
        var speed = 10; //10 at 10
        
        angle = Math.random()*(2*Math.PI);
        generateStaticSystem(gameScreen.width/2+xOffset,gameScreen.height/2+yOffset,Math.cos(angle+90)*speed,Math.sin(angle+90)*speed,50,20000,5);
        console.log("test");
    }

    zoom = 0.002;
}

function generateStaticSystem(x, y, dx, dy, amount, mass, volume){
    var totalMass = mass*amount/2;
    for(i = 0; i < amount; i++){
        var angle = Math.random()*(2*Math.PI);
        var distConstant = Math.pow(Math.random(),1/2)
        var xdistance = distConstant*(gameScreen.width*volume);
        var ydistance = distConstant*(gameScreen.height*volume);
        var xOffset = Math.cos(angle)*ydistance;
        var yOffset = Math.sin(angle)*ydistance;
        var speed = 5;
        angle = Math.random()*(2*Math.PI);
        
        
        
         
//         var xOffset = Math.random()*gameScreen.height-gameScreen.height/2;
//         var yOffset = Math.random()*gameScreen.height-gameScreen.height/2;
        bodies.push(new Body(x+gameScreen.width/2+xOffset,y+gameScreen.height/2+yOffset,Math.pow(Math.random(),1)*mass,dx+Math.cos(angle+90)*speed,dy+Math.sin(angle+90)*speed,"rgb("+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+")"));
    }
    zoom = 1/(2*volume);
}

function generateNoiseSystem(x, y, dx, dy, amount, setMass, volume){
    var totalMass = setMass*amount/2;
    var radius = Math.floor(volume*gameScreen.height/10);
    var noiseMap = getNoiseMap(radius);
    var chance=(amount/(Math.PI*radius*radius));
    var counter = Math.floor(Math.sqrt((Math.PI*radius*radius)/amount));
    for(i = 0; i < noiseMap.length; i+=counter){
        for(k = 0; k < noiseMap[i].length; k+=counter){
            if(noiseMap[i][k] > 0){
                
                var xOffset = i;
                var yOffset = k;
                var speed = 0;
                var angle = Math.random()*(2*Math.PI);
                var mass = Math.pow(noiseMap[i][k]*setMass*2,1);
                bodies.push(new Body(x+gameScreen.width/2-radius+xOffset,y+gameScreen.height/2-radius+yOffset,mass,dx+Math.cos(angle+90)*speed,dy+Math.sin(angle+90)*speed,"rgb("+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+")"));
            }
        }
    }
    
    
    alert("BodiesNum: "+bodies.length);
    zoom = 5/volume;
}

function generateSolarSystem(){
    speed = 0.2;
    var sunMass = 10000;
    for(i = 0; i < 40; i++){
        bodies.push(new Body(Math.random()*gameScreen.width/3,gameScreen.height/2,Math.random()*10,0,-40+Math.random()*80,"rgb("+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+")"));
    }
    
    bodies.push(new Body(gameScreen.width/2-200,gameScreen.height/2,sunMass,0,20,"rgb(255,255,0)"));
    bodies.push(new Body(gameScreen.width/2+200,gameScreen.height/2,sunMass,0,-20,"rgb(255,255,0)"));
}

function generateTestBodies(){
    var distance = 100;
    var mass = 1000;
    bodies.push(new Body(gameScreen.width/2,gameScreen.height/2,mass,0,0,"rgb(100,100,0)"));
    var velocity = Math.sqrt(mass*constant/distance);
    bodies.push(new Body(gameScreen.width/2,gameScreen.height/2+distance,100,-velocity,0,"rgb(100,0,100)"));
    bodies.push(new Body(gameScreen.width/2,gameScreen.height/2-distance,100,velocity,0,"rgb(100,0,100)"));
    bodies.push(new Body(gameScreen.width/2+distance,gameScreen.height/2,100,0,velocity,"rgb(100,0,100)"));
    bodies.push(new Body(gameScreen.width/2-distance,gameScreen.height/2,100,0,-velocity,"rgb(100,0,100)"));
}

function generateThreeBodyProblem(){
    bodies.push(new Body(gameScreen.width/3+Math.random()*gameScreen.width/3,(gameScreen.height-gameScreen.width/3)/2+Math.random()*gameScreen.width/3,1000,0,0,"rgb(100,100,0)"));
    bodies.push(new Body(gameScreen.width/3+Math.random()*gameScreen.width/3,(gameScreen.height-gameScreen.width/3)/2+Math.random()*gameScreen.width/3,1000,0,0,"rgb(100,0,100)"));
    bodies.push(new Body(gameScreen.width/3+Math.random()*gameScreen.width/3,(gameScreen.height-gameScreen.width/3)/2+Math.random()*gameScreen.width/3,1000,0,0,"rgb(0,100,100)"));
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        pause = !pause;
    }else if(event.keyCode == 27) {
        if(settingVelocity){
            bodyDx = 0;
            bodyDy = 0;
            click();
        }
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 37&&camState==FREE){
        camX+=5;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 39&&camState==FREE){
        camX-=5;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 38&&camState==FREE){
        camY+=5;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 40&&camState==FREE){
        camY-=5;
        clearTrace();
    }else if(event.keyCode == 187){
        zoom*=1.1;
        clearTrace();
    }else if(event.keyCode == 189){
        zoom*=0.9;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 49){
        camState = FREE;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 50){
        camState = CENTER;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 51){
        camState = TRACKINGBODY;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 188&&camState==TRACKINGBODY){
        trackedBody--;
        if(trackedBody<0)trackedBody=bodies.length-1;
        clearTrace();
    }else if(!(creatingBody||settingVelocity)&&event.keyCode == 190&&camState==TRACKINGBODY){
        trackedBody++;
        if(trackedBody>bodies.length-1)trackedBody=0;
        clearTrace();
    }
});

function clearTrace(){
   var ctxTrace=traceScreen.getContext("2d");
   ctxTrace.fillStyle = "rgba(0,0,0,1)";
   ctxTrace.fillRect(0, 0, gameScreen.width, gameScreen.height);
}

function click(){
    if(settingVelocity){
        setVelocity();
    }else if(creatingBody){
        setMass();
    }else{
        createBody();
    }
}
function createBody(){
    creatingBody = true;
    bodyX = cursorX;
    bodyY = cursorY;
    bodyColor = "rgb("+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+","+Math.floor(55+Math.random()*200)+")";
}

function setMass(){
    creatingBody = false;
    settingVelocity = true;
}

function setVelocity(){
    
}

function setVelocity(){
    settingVelocity = false;
//     bodyX-=camX;
//     bodyY-=camY;
//     bodyX = (camX+bodyX-gameScreen.width/2)*zoom+gameScreen.width/2;
//     bodyY = (camY+bodyY-gameScreen.height/2)*zoom+gameScreen.height/2;
    bodyX = (bodyX-gameScreen.width/2)/zoom-camX+gameScreen.width/2;
    bodyY = (bodyY-gameScreen.height/2)/zoom-camY+gameScreen.height/2;
    bodyMass/=zoom*zoom*zoom;
    bodyDx/=zoom;
    bodyDy/=zoom;
    bodies.push(new Body(bodyX,bodyY,bodyMass,bodyDx,bodyDy,bodyColor));
}

function update(){
    
    centerOfMassX = 0;
    centerOfMassY = 0;
    totalMass = 0;
    for(i = 0; i <bodies.length; i++){
        centerOfMassX += bodies[i].x*bodies[i].mass;
        centerOfMassY += bodies[i].y*bodies[i].mass;
        totalMass+=bodies[i].mass;
    }
    if(totalMass == 0){
        centerOfMassX = 0;
        centerOfMassY = 0;
    }else{
        centerOfMassX/=totalMass;
        centerOfMassY/=totalMass;
    }
    
        var ctx=gameScreen.getContext("2d");
        var ctxTrace=traceScreen.getContext("2d");
    if(!pause){
        ctxTrace.fillStyle = "rgba(0,0,0,1)";
        ctxTrace.fillRect(0, 0, gameScreen.width, gameScreen.height);
        gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
        var bodiesTemp = [];
        for(i = 0; i < bodies.length; i++){
            bodiesTemp.push(bodies[i]);
        }
        for(i = 0; i < bodiesTemp.length;i++){
            for(k = 0; k < bodiesTemp.length;k++){
                if(bodies[i]!=bodies[k]){
                    var force = speed*constant*(bodies[k].mass)/((bodies[i].x-bodies[k].x)*(bodies[i].x-bodies[k].x)+(bodies[i].y-bodies[k].y)*(bodies[i].y-bodies[k].y));
                    var angle = Math.atan2((bodies[k].y-bodies[i].y),(bodies[k].x-bodies[i].x));
                    bodiesTemp[i].dx+=Math.cos(angle)*force;
                    bodiesTemp[i].dy+=Math.sin(angle)*force;
                }
            }
        }
        bodies = bodiesTemp;
    
        for(i = 0; i < bodies.length; i++){
            bodies[i].x+=speed*bodies[i].dx;
            bodies[i].y+=speed*bodies[i].dy;
            for(k = 0; k < bodies.length; k++){
                if(bodies[i]!=bodies[k]&&Math.sqrt((bodies[i].x-bodies[k].x)*(bodies[i].x-bodies[k].x)+(bodies[i].y-bodies[k].y)*(bodies[i].y-bodies[k].y))<Math.pow(bodies[i].mass,1/3)+Math.pow(bodies[k].mass,1/3)){
                    bodies[i].dx = (bodies[i].dx*bodies[i].mass+bodies[k].dx*bodies[k].mass)/(bodies[i].mass+bodies[k].mass);
                    bodies[i].dy = (bodies[i].dy*bodies[i].mass+bodies[k].dy*bodies[k].mass)/(bodies[i].mass+bodies[k].mass);
                    bodies[i].x = (bodies[i].x*bodies[i].mass+bodies[k].x*bodies[k].mass)/(bodies[i].mass+bodies[k].mass);
                    bodies[i].y = (bodies[i].y*bodies[i].mass+bodies[k].y*bodies[k].mass)/(bodies[i].mass+bodies[k].mass);
                    bodies[i].color = (bodies[i].mass>bodies[k].mass)?bodies[i].color:bodies[k].color;
                    bodies[i].mass+=bodies[k].mass;
                    if(trackedBody==k)trackedBody=i;
                    bodies.splice(k,1);
                    k--;
                    if(k<i){
                        i--;
                    }
                    if(k<trackedBody){
                        trackedBody--;
                    }
                }
            }
        }
    }
    for(i = 0; i < bodies.length; i++){ 
            ctx.strokeStyle = bodies[i].color;
            ctx.fillStyle = bodies[i].color;
            if(camState==TRACKINGBODY&&trackedBody == i)ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.beginPath();
            ctx.arc((camX+bodies[i].x-gameScreen.width/2)*zoom+gameScreen.width/2,(camY+bodies[i].y-gameScreen.height/2)*zoom+gameScreen.height/2,Math.pow(bodies[i].mass,1/3)*zoom,0,2*Math.PI);
            ctx.fill();
        
        
        
        
//             ctxTrace.strokeStyle=bodies[i].color;
//             ctxTrace.beginPath();
//             ctxTrace.moveTo((camX+bodies[i].x-gameScreen.width/2)*zoom+gameScreen.width/2-speed*bodies[i].dx*zoom,(camY+bodies[i].y-gameScreen.height/2)*zoom+gameScreen.height/2-speed*bodies[i].dy*zoom);
//             ctxTrace.lineTo((camX+bodies[i].x-gameScreen.width/2)*zoom+gameScreen.width/2,(camY+bodies[i].y-gameScreen.height/2)*zoom+gameScreen.height/2);
//             ctxTrace.stroke();
        }
    drawScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);

    var ctxDraw=drawScreen.getContext("2d")
    if(creatingBody){
        ctxDraw.strokeStyle = bodyColor;
        ctxDraw.beginPath();
        bodyMass = Math.pow(Math.sqrt((bodyX-cursorX)*(bodyX-cursorX)+(bodyY-cursorY)*(bodyY-cursorY)),3);
        ctxDraw.arc(bodyX,bodyY,Math.pow(bodyMass,1/3),0,2*Math.PI);
        ctxDraw.stroke();
    }else if(settingVelocity){
        ctxDraw.strokeStyle = bodyColor;
        ctxDraw.beginPath();
        bodyDx = (cursorX-bodyX)/10;
        bodyDy = (cursorY-bodyY)/10;
        ctxDraw.arc(bodyX,bodyY,Math.pow(bodyMass,1/3),0,2*Math.PI);
        ctxDraw.moveTo(bodyX,bodyY);
        ctxDraw.lineTo(cursorX,cursorY)
        ctxDraw.stroke();
    }
    
    totalDx = 0;
    totalDy = 0;
    var totalMass = 0;
    for(i = 0; i < bodies.length; i++){
        totalDx+=bodies[i].dx*bodies[i].mass;
        totalDy+=bodies[i].dy*bodies[i].mass;
        totalMass+=bodies[i].mass;
    }
    if(totalMass == 0){
        totalDx = 0;
        totalDy = 0;
    }else{
        totalDx/=totalMass;
        totalDy/=totalMass;
    }
    totalAngle = Math.atan2(totalDy,totalDx);
    totalVel = Math.sqrt(totalDx*totalDx+totalDy*totalDy);
    var text = "System Velocity: "+Math.round(100*totalVel)/100+"<br>System Angle: "+Math.round(100*(totalAngle/Math.PI*180))/100+"<br> Zoom: "+Math.round(100*(zoom))/100+"<br> CamX: "+Math.round(100*(camX))/100+"<br> camY: "+Math.round(100*(camY))/100;;
    if(camState==FREE){
        text+="<br> CamState: Free";
    }else if(camState==CENTER){
        text+="<br> CamState: Center"+"<br> CenterX: "+Math.round(100*centerOfMassX)/100+"<br> CenterY: "+Math.round(100*centerOfMassY)/100;
    }else if(camState==TRACKINGBODY){
        text+="<br> CamState: Tracking"+"<br> Tracking Body #: "+trackedBody+"<br> BodyX: "+Math.round(100*bodies[trackedBody].x)/100+"<br> BodyY: "+Math.round(100*bodies[trackedBody].y)/100;
    }
    totalVelCoutner.innerHTML = text;
    
    ctx.strokeStyle = "rgb(255,255,255)";
    //(camX+bodies[i].x-gameScreen.width/2)*zoom+gameScreen.width/2
    var screenX = (camX+centerOfMassX-gameScreen.width/2)*zoom+gameScreen.width/2;
    var screenY = (camY+centerOfMassY-gameScreen.height/2)*zoom+gameScreen.height/2;
    ctx.beginPath();
    ctx.moveTo(screenX+10,screenY);
    ctx.lineTo(screenX-10,screenY);
    ctx.moveTo(screenX,screenY+10);
    ctx.lineTo(screenX,screenY-10);
    ctx.stroke();
    if(camState == CENTER){
        camX = gameScreen.width/2-centerOfMassX;
        camY = gameScreen.height/2-centerOfMassY;
    }else if(camState == TRACKINGBODY){
        camX = -bodies[trackedBody].x-speed*bodies[trackedBody].dx+gameScreen.width/2;
        camY = -bodies[trackedBody].y-speed*bodies[trackedBody].dy+gameScreen.height/2;
    }
    window.requestAnimationFrame(update);

}

// generateLastStableSystem();
// generateStableThreeBodySystem();
// generateGalaxy();

// generateSystem(0, 0, 0, 0,1000,10,1);
//
// generateStaticSystem(0, 0, 0, 0,1000,1000,5);
generateNoiseSystem(0, 0, 0, 0,1000,5,10);






// generateStaticGalaxy();


// generateSolarSystem();
// generateTestBodies();

// generateThreeBodyProblem();


window.requestAnimationFrame(update);