window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var bodies = [];
var g = 0.01;

function Body(size, x, y, z, dx, dy, dz) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.z = z;
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;
    this.phys = BABYLON.Mesh.CreateSphere('sphere1', 16, 1, scene);
    this.update = function() {
        for(i = 0; i < bodies.length; i++) {
            if(bodies[i] != this) {
                var distance = Math.sqrt((this.x - bodies[i].x) * (this.x - bodies[i].x) + (this.y - bodies[i].y) * (this.y - bodies[i].y) + (this.z - bodies[i].z) * (this.z - bodies[i].z));
                var force = (this.size * bodies[i].size * g) / (distance * distance)
                var acel = force / this.size;
                var horizontalDist = Math.sqrt((this.x - bodies[i].x) * (this.x - bodies[i].x) + (this.z - bodies[i].z) * (this.z - bodies[i].z));
                var yAngle = Math.atan2((bodies[i].y - this.y), horizontalDist);
                var xAngle = Math.atan2((bodies[i].x - this.x), (bodies[i].z - this.z));
                var yForce = Math.sin(yAngle) * acel;
                var horForce = Math.cos(yAngle) * acel;
                this.dx += Math.sin(xAngle) * horForce;
                this.dy += yForce;
                this.dz += Math.cos(xAngle) * horForce;
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    };
    this.collide = function() {
        for(i = 0; i < bodies.length; i++) {
            if(bodies[i] != this) {
                var distance = Math.sqrt((this.x - bodies[i].x) * (this.x - bodies[i].x) + (this.y - bodies[i].y) * (this.y - bodies[i].y) + (this.z - bodies[i].z) * (this.z - bodies[i].z));
                if(distance < Math.cbrt(this.size)/2+Math.cbrt(bodies[i].size)/2){
                    scene.meshes.splice(scene.meshes.indexOf(this.phys),1);
                    scene.meshes.splice(scene.meshes.indexOf(bodies[i].phys),1);
                    this.phys.dispose();
                    bodies[i].phys.dispose();
                    bodies.push(new Body(this.size+bodies[i].size,(this.x*this.size+bodies[i].x*bodies[i].size)/(this.size+bodies[i].size),(this.y*this.size+bodies[i].y*bodies[i].size)/(this.size+bodies[i].size), (this.z*this.size+bodies[i].z*bodies[i].size)/(this.size+bodies[i].size),(this.dx*this.size+bodies[i].dx*bodies[i].size)/(this.size+bodies[i].size),(this.dy*this.size+bodies[i].dy*bodies[i].size)/(this.size+bodies[i].size),(this.dz*this.size+bodies[i].dz*bodies[i].size)/(this.size+bodies[i].size)));
                    bodies.splice(i,1);
                    if(i<e)e--;
                    bodies.splice(e,1);
                    e--;
                    break;
                }
            }
        }
    }
    this.transfer = function() {
        this.phys.position.x = this.x;
        this.phys.position.y = this.y;
        this.phys.position.z = this.z;
        this.phys.scaling.x = Math.cbrt(this.size);
        this.phys.scaling.y = Math.cbrt(this.size);
        this.phys.scaling.z = Math.cbrt(this.size);
    };
}
for(i = 0; i < 1000; i++) {
    bodies.push(new Body(0.1, 50 - Math.random() * 100, 5-Math.random()*10, 50 - Math.random() * 100, 0.1-Math.random()*0.2, 0, 0.1-Math.random()*0.2));
}
// bodies.push(new Body(100, 0, 0, 0, 0, 0, 0));
// bodies.push(new Body(1, 0, 0, 0, 0, 0, 0));
// bodies.push(new Body(1, 1, 0, 0, 0, 0, 0));
// bodies.push(new Body(1, 2, 0, 0, 0, 0, 0));

function begin() {
    // get the canvas DOM element
    // load the 3D engine
    // createScene function that creates and return the scene
    // create a basic BJS Scene object
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 50, 0), scene);
    // target the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    // attach the camera to the canvas
    camera.attachControl(canvas, false);
    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
    // move the sphere upward 1/2 of its height
    // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
    // return the created scene
    // run the render loop
    engine.runRenderLoop(function() {
        for(e = 0; e < bodies.length; e++) {
            bodies[e].update();
        }
        for(e = 0; e < bodies.length; e++) {
            bodies[e].collide();
        }
        for(e = 0; e < bodies.length; e++) {
            bodies[e].transfer();
        }
        scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', function() {
        engine.resize();
    });
}
window.addEventListener('DOMContentLoaded', function() {
    begin()
});