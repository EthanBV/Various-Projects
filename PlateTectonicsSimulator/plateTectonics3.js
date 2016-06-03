var gameScreen;
var world;
var size = 100;

//--CONSTRUCTORS

//tile constructor
function tile(x,y){
    this.elevation = 0;
    this.plate = null;
    this.x = x;
    this.y = y;
}

//plate constructor
function plate(){
    this.tiles = [];
    this.xVel = 0;
    this.yVel = 0;
}

//world constuctor
function world(){
    this.plates = [];
    this.map = [];
}

//--GENERATION CODE

function createGameScreen(){
    gameScreen = document.createElement("CANVAS");
    gameScreen.id = "gameScreen";
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "rgba(0,0,0,0)";
    document.body.appendChild(gameScreen);
}

function generateWorld(){
    world = new world();
    world.map = getNoiseMap(size);
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){
            world.map[i][k]*=100;
            world.map[i][k]+=5;
        }
    }
}

//--ALGORITHYM CODE

//move plates around the map;
function movePlates(){
    
}

//overlaping plates change elevation.
function collidePlates(){
    
}

//plates under eachother are melted and destroyed.
function downSink(){
    
}

//expand plates thru mantle upwelling.
function upWell(){
    
}

//renders the map;
function draw(){
    gameScreen.getContext("2d").clearRect(0, 0, gameScreen.width, gameScreen.height);
   
    var ctx = gameScreen.getContext("2d");
    for(i = 0; i < size; i++){
        for(k = 0; k < size; k++){ 
                ctx.fillStyle = "rgb("+Math.floor(world.map[i][k])+","+Math.floor(world.map[i][k])+","+Math.floor(world.map[i][k])+")";
                ctx.fillRect(30+i*07,30+k*7,7,7);
                ctx.fill();
        }
    }
}


//update loop
function update(){
    movePlates();
    collidePlates();
    downSink();
    upWell();
    draw();
    document.getElementById("counter").innerHTML = ""+(parseInt(document.getElementById("counter").innerHTML)+1);
    window.requestAnimationFrame(update);   
}

//--INITIAL FUNCTION CALLS TO BEGIN

createGameScreen();
generateWorld();
window.requestAnimationFrame(update);