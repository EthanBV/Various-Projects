// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
var dx = 0;
var dz = 0;
var camera;
var mouseDx = 0;
var mouseDy = 0;
var map = [];
for(i = 0; i < 100; i++) {
    map.push([]);
    for(k = 0; k < 100; k++) {
        map[map.length - 1].push(Math.random());
    }
}
var noise = new noise2d(100, 5);
var ribbon;
var paths;
// noise.grid = map;
// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built
var createScene = function() {
    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    // This creates and positions a free camera
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    //     camera.attachControl(canvas, false);
    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(1, -1, 0), scene);
    // Dim the light a small amount
    light.intensity = .5;
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.darkness = new BABYLON.Color3(0, 1, 1);
    light.specular = new BABYLON.Color3(0, 0, 0);
    
    
    //shadows
    //
    // Leave this function
    // 
    paths = [];
    for(var x = 0; x < world.map.length; x += 0.5) {
        var path = [];
        for(var z = 0; z < world.map.length; z += 0.5) {
            var y = noise.getPointTri2(x, z) * 100;
            path.push(new BABYLON.Vector3(x * 10, y, z * 10));
        }
        paths.push(path);
    }
    var ribbonMaterial = new BABYLON.StandardMaterial("ground", scene);
    ribbonMaterial.diffuseTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/grass.png", scene);
    ribbonMaterial.diffuseTexture.uScale = 5.0;
    ribbonMaterial.diffuseTexture.vScale = 5.0;
    ribbon = BABYLON.Mesh.CreateRibbon("ribbon", paths, false, false, 0, scene, true, BABYLON.Mesh.DOUBLESIDE);
    ribbon.position.y = -200
    ribbon.material = ribbonMaterial;
    ribbon.receiveShadows = true;
    var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.getShadowMap().renderList.push(ribbon);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.useVarianceShadowMap = false;
    shadowGenerator.setDarkness(0.5);
    
    
    
//     var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 512, 512, 1, scene, false);
// 	var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(1024, 1024));
// 	water.backFaceCulling = true;
// 	water.bumpTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/waterbump.png", scene);
// 	water.windForce = -5;
// 	water.waveHeight = 0.5;
// 	water.bumpHeight = 0.1;
// 	water.waveLength = 0.1;
// 	water.colorBlendFactor = 0;
// 	water.addToRenderList(ribbon);
// 	waterMesh.material = water;
    
    return scene;
}; // End of createScene function
// -------------------------------------------------------------
// Now, call the createScene function that you just finished creating
var scene = createScene();
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
    noise.grid = world.map;
    for(i = 0; i < world.map.length; i++) {
        for(k = 0; k < world.map.length; k++) {
            noise.grid[i][k] = world.map[i][k].elevation;
        }
    }
    noise.magnitude = 1;
    scene.render()
    for(var x = 0; x < world.map.length; x += 0.5) {
        for(var z = 0; z < world.map.length; z += 0.5) {
            var y = noise.getPointTri2(x, z);
            paths[x * 2][z * 2].x = x * 10;
            paths[x * 2][z * 2].y = y;
            paths[x * 2][z * 2].z = z * 10;
        }
    }
    ribbon = BABYLON.MeshBuilder.CreateRibbon(null, {
        pathArray: paths,
        instance: ribbon
    });
    this.move(keys[65], keys[68], keys[87], keys[83]);
    camera.position.x += dx;
    //     camera.position.y +=dy;
    camera.position.z += dz;
    if(mouseDx != 0) {
        camera.rotation.y += mouseDx / 1000;
        mouseDx = 0;
    }
    if(mouseDy != 0) {
        camera.rotation.x += mouseDy / 1000;
        mouseDy = 0;
    }
    if(keys[32]) camera.position.y += 0.5;
    if(keys[16]) camera.position.y -= 0.5;
    var angle = Math.atan2(dz, dx);
    var vel = Math.sqrt(dz * dz + dx * dx);
    vel *= 0.85;
    dz = Math.sin(angle) * vel;
    dx = Math.cos(angle) * vel;
    if(Math.abs(dx) < 0.01) dx = 0;
    if(Math.abs(dz) < 0.01) dz = 0;
    
    
    // _____UPDATE STUFF
    if(xOff < 0) xOff += size;
    if(xOff >= size) xOff -= size;
    if(yOff < 0) yOff += size;
    if(yOff >= size) yOff -= size;
    if(!paused) {
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
});

function move(left, right, down, up) {
    var vel = 0.1;
    var forwards = 0;
    var sideways = 0;
    if(left) sideways++;
    if(right) sideways--;
    if(down) forwards--;
    if(up) forwards++;
    if(sideways !== 0 || forwards !== 0) {
        var angle = Math.atan2(forwards, sideways) - camera.rotation.y;
        dz -= Math.sin(angle) * vel;
        dx -= Math.cos(angle) * vel;
    }
}

function noise2d(width, magnitude) {
    if(width % magnitude > 1) throw "width not divisible by magnitude";
    this.width = width;
    this.magnitude = magnitude;
    this.grid = [];
    for(i = 0; i < width / magnitude; i++) {
        this.grid.push([]);
        for(k = 0; k < width / magnitude; k++) {
            this.grid[i].push(Math.random());
        }
    }
    this.getPointTri2 = function(x, y) {
        var gridX, gridY;
        gridX = Math.floor(x / this.magnitude);
        gridY = Math.floor(y / this.magnitude);
        var bl, br, tl, tr;
        bl = this.grid[gridX][gridY];
        if(gridX >= this.grid.length - 1) br = this.grid[0][gridY];
        else br = this.grid[gridX + 1][gridY];
        if(gridY >= this.grid.length - 1) tl = this.grid[gridX][0];
        else tl = this.grid[gridX][gridY + 1];
        if(gridX >= this.grid.length - 1 && gridY >= this.grid.length - 1) tr = this.grid[0][0];
        else if(gridX >= this.grid.length - 1) tr = this.grid[0][gridY + 1];
        else if(gridY >= this.grid.length - 1) tr = this.grid[gridX + 1][0];
        else tr = this.grid[gridX + 1][gridY + 1];
        var setX, setY;
        setX = x - (gridX * this.magnitude);
        setY = y - (gridY * this.magnitude);
        var lv, rv, bv, tv, la, ra, ba, ta, lxOff, rxOff, bxOff, txOff, lyOff, ryOff, byOff, tyOff;
        la = (bl - tl) / 2;
        ra = (br - tr) / 2;
        ba = (bl - br) / 2;
        ta = (tl - tr) / 2;
        lxOff = this.magnitude / 2;
        rxOff = this.magnitude / 2;
        bxOff = this.magnitude / 2;
        txOff = this.magnitude / 2;
        lyOff = (bl + tl) / 2;
        ryOff = (br + tr) / 2;
        byOff = (bl + br) / 2;
        tyOff = (tl + tr) / 2;
        lv = la * Math.sin((Math.PI / this.magnitude) * (setY + lxOff)) + lyOff;
        rv = ra * Math.sin((Math.PI / this.magnitude) * (setY + rxOff)) + ryOff;
        bv = ba * Math.sin((Math.PI / this.magnitude) * (setX + bxOff)) + byOff;
        tv = ta * Math.sin((Math.PI / this.magnitude) * (setX + txOff)) + tyOff;
        var lDist, rDist, bDist, tDist;
        lDist = setX;
        rDist = this.magnitude - lDist;
        bDist = setY;
        tDist = this.magnitude - bDist;
        var value = 0;
        //         value += bl*Math.max(0,(this.magnitude-lDist)*(this.magnitude-bDist));
        //         value += br*(this.magnitude-rDist)*(this.magnitude-bDist);
        //         value += tl*(this.magnitude-lDist)*(this.magnitude-tDist);
        //         value += tr*Math.max(0,(this.magnitude-rDist)*(this.magnitude-tDist));
        value += lv * (this.magnitude - lDist);
        value += rv * (this.magnitude - rDist);
        value += bv * (this.magnitude - bDist);
        value += tv * (this.magnitude - tDist);
        return value / (this.magnitude * 2);
    }
}
// Watch for browser/canvas resize events
window.addEventListener("resize", function() {
    engine.resize();
});
window.addEventListener('DOMContentLoaded', function() {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    canvas.onclick = function() {
        canvas.requestPointerLock();
    };
    document.addEventListener("mousemove", function(e) {
        mouseDx += e.movementX || e.mozMovementX || 0;
        mouseDy += e.movementY || e.mozMovementY || 0;
    });
});
var keys = [];
onkeydown = onkeyup = function(e) {
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
};