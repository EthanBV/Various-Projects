var canvas;
var engine;
var world;

var mouseDx = 0;
var mouseDy = 0;

function beginGame(){
    
    // get the canvas DOM element
    canvas = document.getElementById('renderCanvas');
    // load the 3D engine
    engine = new BABYLON.Engine(canvas, true);
    
    world = {
        areas:[getArea(1)],
        curArea:0,
        update: function(){
            this.areas[this.curArea].update();
        },
    };
    
    engine.runRenderLoop(function() {
        world.update();
        world.areas[world.curArea].scene.render();
    });
    window.addEventListener('resize', function() {
        engine.resize();
    });
}

function area(){
    this.player = null;
    this.scene = new BABYLON.Scene(engine);
    this.skybox = null;
    this.entities = [];
//     this.cam = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -15), this.scene);
//     this.cam.setTarget(BABYLON.Vector3.Zero());
//     this.cam.attachControl(canvas, false);
    this.cam = null;
    this.floors = [];
    this.lights = [];
    this.shadows = [];
    this.addEntity = function(entity){
        for(i = 0; i < this.shadows.length; i++){
            this.shadows[i].getShadowMap().renderList.push(entity.phys);
        }
        entity.phys.receiveShadows = true;
        this.entities.push(entity);
    };
    
    this.addFloor = function(floor){
        this.floors.push(floor);
        floor.receiveShadows = true;
    };
    
    this.addLight = function(light){
        this.lights.push(light);
        var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
        for(i = 0; i < this.entities.length; i++)shadowGenerator.getShadowMap().renderList.push(this.entities[i].phys);
        shadowGenerator.useBlurVarianceShadowMap = true;
        shadowGenerator.useVarianceShadowMap = false;
        shadowGenerator.setDarkness(0.5);
        this.shadows.push(shadowGenerator);
    };
    
    this.update = function(){
        for(i = 0; i < this.entities.length; i++){
            this.entities[i].update();
        }
        for(i = 0; i < this.entities.length; i++){
            this.entities[i].updatePhys();
        }
        this.cam.update();
        this.cam.updatePhys();
        this.skybox.update();
        this.skybox.updatePhys();
        
    }
    
}



window.addEventListener('DOMContentLoaded', function() {
    beginGame();
    
canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock;
    
    canvas.onclick = function() {
        canvas.requestPointerLock();
    };

document.addEventListener("mousemove", function(e){
    mouseDx += e.movementX ||
            e.mozMovementX      ||
            0;

    mouseDy += e.movementY ||
            e.mozMovementY      ||
            0;
});
//     // get the canvas DOM element
//     var canvas = document.getElementById('renderCanvas');
//     // load the 3D engine
//     var engine = new BABYLON.Engine(canvas, true);
//     // createScene function that creates and return the scene
//     var createScene = function() {
//         // create a basic gdfgeBJS Scene object
//         var scene = new BABYLON.Scene(engine);
//         // create a basic light, aiming 0,1,0 - meaning, to the sky
//         //                 var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,1,0), scene);
//         //                 
//         var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(50, 100, 0), scene);
//         var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(50, 100, 0), scene);
//         light1.diffuse = new BABYLON.Color3(0.1, 0.1, 0.1);
//         light1.specular = new BABYLON.Color3(0, 0, 0);
//         light1.groundColor = new BABYLON.Color3(0, 0, 0)
        
//         light = light0;
//         light0.diffuse = new BABYLON.Color3(1, 1, 1);
//         light0.specular = new BABYLON.Color3(0, 0, 0);
//         // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
//         var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -15), scene);
//         // target the camera to scene origin
//         camera.setTarget(BABYLON.Vector3.Zero());
//         // attach the camera to the canvas
//         camera.attachControl(canvas, false);
//         cam = camera;
//         var floorMat = new BABYLON.StandardMaterial(null, scene);
//         floorMat.diffuseTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/grass.png", scene);
//         floorMat.diffuseTexture.uScale = 50.0;
//         floorMat.diffuseTexture.vScale = 50.0;
//         var ground = BABYLON.Mesh.CreateGround('ground1', 600, 600, 2, scene);
//         var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
//         sphere.position.y = 5;
//         ground.material = floorMat;
//         var shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
//         shadowGenerator.getShadowMap().renderList.push(sphere);
//         shadowGenerator.useBlurVarianceShadowMap = true;
//         ground.receiveShadows = true;
//         return scene;
//     }
//     // call the createScene function
//     var scene = createScene();
//     engine.runRenderLoop(function() {
//         scene.render();
//     });
//     // the canvas/window resize event handler
//     window.addEventListener('resize', function() {
//         engine.resize();
//     });
});