var gameScreen = document.createElement("CANVAS");
gameScreen.style.position = "absolute";
gameScreen.style.left = "0px";
gameScreen.style.top = "0px";
gameScreen.width = window.innerWidth;
gameScreen.height = window.innerHeight;
gameScreen.style.backgroundColor = "rgba(0,191,255,1)";
document.body.appendChild(gameScreen);

var ctx = gameScreen.getContext("2d");

var infoBox = document.createElement("DIV");
infoBox.style.position = "absolute";
infoBox.style.left = "0px";
infoBox.style.top = "0px";
infoBox.style.width = window.innerWidth;
infoBox.style.height = "30px";
infoBox.style.backgroundColor = "rgba(100,100,100,1)";
infoBox.innerHTML = "";
document.body.appendChild(infoBox);


var obs = [];
var playerP = new player();

function player(){
    this.xAngle = 0;
    this.yAngle = 0;
    this.xPos = 0;
    this.yPos = 0;
    this.fov = 90;
    this.sprite = document.createElement("IMG");
    this.sprite.src = "https://github.com/nxbt/dungeon-game/blob/master/core/assets/Person.png?raw=true"; 
    this.getScreenPosition = function(x,y){
        var dist = Math.sqrt((this.xPos-x)*(this.xPos-x)+(this.yPos-y)*(this.yPos-y));
        var x, y;
        var angle = Math.atan2(y-this.yPos,x-this.xPos)*180/Math.PI;
        if(Math.abs(this.xAngle-angle)>180){
            if(angle<0)angle = 360+angle;
            else angle = angle-360;
        }
        var leftAngle = this.xAngle - this.fov/2;
        var rightAngle = this.xAngle + this.fov/2;
        //need to sort out angle wraping issues :(
        x = gameScreen.width - gameScreen.width*((angle-rightAngle)/(leftAngle-rightAngle));
        y = gameScreen.height-(gameScreen.height*(1-1/Math.sqrt(dist+1)))/2;
//         y = gameScreen.height-(gameScreen.height*Math.min(1,dist/100))/2;
        return [dist,Math.floor(x),y];
    }
    this.move = function(){
        this.xPos+=Math.cos(this.xAngle/180*Math.PI)*1;
        this.yPos+=Math.sin(this.xAngle/180*Math.PI)*1;
    }
    this.moveback = function(){
        this.xPos-=Math.cos(this.xAngle/180*Math.PI)*1;
        this.yPos-=Math.sin(this.xAngle/180*Math.PI)*1;
    }
    this.drawMinMap = function(){
        ctx.drawImage(this.sprite,this.xPos+100-5,gameScreen.height-100+this.yPos,10,10);
        ctx.strokeStyle = "rgb(255,0,0)";
        ctx.fillStyle = "rgba(0,255,0,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.xPos+100,gameScreen.height-100+this.yPos);
        ctx.lineTo(this.xPos+100+Math.cos((this.xAngle+this.fov/2)/180*Math.PI)*100,gameScreen.height-100+this.yPos+Math.sin((this.xAngle+this.fov/2)/180*Math.PI)*100);
        ctx.lineTo(this.xPos+100+Math.cos((this.xAngle-this.fov/2)/180*Math.PI)*100,gameScreen.height-100+this.yPos+Math.sin((this.xAngle-this.fov/2)/180*Math.PI)*100);
        ctx.lineTo(this.xPos+100,gameScreen.height-100+this.yPos);
        ctx.fill();
//         ctx.rect(0,0,100,100);
        ctx.stroke();
    }
}

function tree(x,y){
    this.x = x;
    this.y = y;
    this.size = 0.5+Math.random()*0.5;
    this.width = 2000*this.size;
    this.height = 4000*this.size;
    this.sprite = document.createElement("IMG");
    this.sprite.src = "http://vignette2.wikia.nocookie.net/herebemonsters/images/4/48/Pine-Tree-Sprite.png/revision/latest?cb=20140329010041";    
    this.draw = function(){
        var pos = playerP.getScreenPosition(this.x,this.y);
        var tempHeight = this.height/pos[0];
        var tempWidth = this.width/pos[0];
//         var tempHeight = 100;
//         var tempWidth = 50;
//         alert(pos[1]);
        ctx.drawImage(this.sprite,pos[1]-tempWidth/2,pos[2]-tempHeight*0.85,tempWidth,tempHeight);
    }
    this.drawMinMap = function(){
        ctx.drawImage(this.sprite,this.x+100-5,gameScreen.height-100+this.y,10,10);
    }
    this.update = function(){
        
    }

}

function grass(x,y){
    this.x = x;
    this.y = y;
    this.size = 0.5+Math.random()*0.5;
    this.width = 200*this.size;
    this.height = 200*this.size;
    this.sprite = document.createElement("IMG");
    this.sprite.src = "http://img.photobucket.com/albums/v325/mwahaha/arrt/forum/quick_grass.png";    
    this.draw = function(){
        var pos = playerP.getScreenPosition(this.x,this.y);
        var tempHeight = this.height/pos[0];
        var tempWidth = this.width/pos[0];
//         var tempHeight = 100;
//         var tempWidth = 50;
//         alert(pos[1]);
        ctx.drawImage(this.sprite,pos[1]-tempWidth/2,pos[2]-tempHeight,tempWidth,tempHeight);
    }
    this.drawMinMap = function(){
        ctx.drawImage(this.sprite,this.x+100-5,gameScreen.height-100+this.y,10,10);
    }
    this.update = function(){
        
    }

}

function raptor(x,y){
    this.x = x;
    this.y = y;
    this.size = 0.5+Math.random()*0.5;
    this.width = 400*this.size;
    this.height = 400*this.size;
    this.sprite = document.createElement("IMG");
    this.sprite.src = "http://piq.codeus.net/static/media/userpics/piq_134611_400x400.png";    
    this.draw = function(){
        var pos = playerP.getScreenPosition(this.x,this.y);
        var tempHeight = this.height/pos[0];
        var tempWidth = this.width/pos[0];
//         var tempHeight = 100;
//         var tempWidth = 50;
//         alert(pos[1]);
        ctx.drawImage(this.sprite,pos[1]-tempWidth/2,pos[2]-tempHeight*0.8,tempWidth,tempHeight);
    }
    this.drawMinMap = function(){
        ctx.drawImage(this.sprite,this.x+100-5,gameScreen.height-100+this.y,10,10);
    }
    this.update = function(){
        var angle = Math.atan2(playerP.yPos-this.y,playerP.xPos - this.x);
        this.x+=Math.cos(angle)*0.3;
        this.y+=Math.sin(angle)*0.3;
    }

}

function mountain(x,y){
    this.x = x;
    this.y = y;
    this.width = 60000;
    this.height = 40000;
    this.sprite = document.createElement("IMG");
    this.sprite.src = "http://vignette1.wikia.nocookie.net/finalfantasy/images/2/2b/FF4_PSP_Mt_Ordeals.png/revision/latest?cb=20121106202705";    
    this.draw = function(){
        var pos = playerP.getScreenPosition(this.x,this.y);
        var tempHeight = this.height/pos[0];
        var tempWidth = this.width/pos[0];
//         var tempHeight = 100;
//         var tempWidth = 50;
//         alert(pos[1]);
        ctx.drawImage(this.sprite,pos[1]-tempWidth/2,pos[2]-tempHeight*0.9,tempWidth,tempHeight);
    }
    this.drawMinMap = function(){
        ctx.drawImage(this.sprite,this.x+100-5,gameScreen.height-100+this.y,10,10);
    }
    this.update = function(){
        
    }

}

for(i = 0; i < 1000; i++){
    obs.push(new tree(100-Math.random()*200,100-Math.random()*200));
}
for(i = 0; i < 1000; i++){
    obs.push(new grass(100-Math.random()*200,100-Math.random()*200));
}for(i = 0; i < 1000; i++){
    obs.push(new raptor(100-Math.random()*200,100-Math.random()*200));
}
for(i = -100; i <= 100; i+=50){
    for(k = -100; k <= 100; k+=50){
        if(i == -100||k == -100|| i == 100|| k == 100){
            obs.push(new mountain(i,k));
        }
    }
}
function update(){
    for(i = 0; i < obs.length; i++){
        obs[i].update();
    }
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
//     ctx.strokeStyle = "rgb(0,100,0)";
    ctx.fillStyle = "rgb(0,150,0)";
//     ctx.lineWidth = 0.5;
//     ctx.beginPath();
//     for(i =-100; i <100; i++){
//         for(k = -100; k < 100; k++){
//             var pos1 = playerP.getScreenPosition(i,k);
//             var pos2 = playerP.getScreenPosition(i+1,k);
//             var pos3 = playerP.getScreenPosition(i+1,k+1);
//             var pos4 = playerP.getScreenPosition(i,k+1);
//             if(pos1[1]>0&&pos1[1]<gameScreen.width&&pos2[1]>0&&pos2[1]<gameScreen.width&&pos3[1]>0&&pos3[1]<gameScreen.width&&pos4[1]>0&&pos4[1]<gameScreen.width){
//                 ctx.moveTo(pos1[1],pos1[2]);
//                 ctx.lineTo(pos2[1],pos2[2]);
//                 ctx.lineTo(pos3[1],pos3[2]);
//                 ctx.lineTo(pos4[1],pos4[2]);
//                 ctx.lineTo(pos1[1],pos1[2]);
//             }
//         }
//     }
//     ctx.fill();
//     ctx.stroke();
    ctx.fillRect(0,gameScreen.height/2,gameScreen.width, gameScreen.height/2)
    obs.sort(function(a,b){
       return playerP.getScreenPosition(b.x,b.y)[0] - playerP.getScreenPosition(a.x,a.y)[0]; 
    });
    for(i = 0; i < obs.length; i++){
        obs[i].draw();
    }
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,gameScreen.height-200,200,200);
    for(i = 0; i < obs.length; i++){
        obs[i].drawMinMap();
    }
    playerP.drawMinMap();
    infoBox.innerHTML = ""+playerP.xAngle;
    window.requestAnimationFrame(update);
}


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        playerP.xAngle-=5;
        if(playerP.xAngle < -180)playerP.xAngle+=360;
    }else if(event.keyCode == 39) {
        playerP.xAngle+=5;
        if(playerP.xAngle > 180)playerP.xAngle-=360;
    }else if(event.keyCode == 38) {
        playerP.move();
    }else if(event.keyCode == 40) {
        playerP.moveback();
    }
});

window.requestAnimationFrame(update);