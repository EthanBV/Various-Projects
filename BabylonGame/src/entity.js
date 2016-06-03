function Entity(x,y){
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.dx = 0;
    this.dy = 0;
    this.dz = 0;
    this.xAngle = 0;
    this.yAngle = 0;
    this.zAngle = 0;
    this.update = function(){
        this.x +=this.dx;
        this.y +=this.dy;
        this.z +=this.dz;
    };
    this.updatePhys = function(){
        this.phys.position.x = this.x;
        this.phys.position.y = this.y;
        this.phys.position.z = this.z;
        this.phys.rotation.x = this.xAngle;
        this.phys.rotation.y = this.yAngle;
    };
}

function Sphere(area,x,y,z,radius){
    this.phys = BABYLON.Mesh.CreateSphere('sphere1', 16, radius, area.scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function(){
        
    };
}
Sphere.prototype = new Entity();

function Box(area,x,y,z,size){
    this.phys = BABYLON.Mesh.CreateBox("box", size, area.scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function(){
        this.xAngle+=0.01;
    };
}
Box.prototype = new Entity();

function Duster(area, x, y, z, size){
    this.phys = BABYLON.Mesh.CreateBox("duster", size, area.scene);
    this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, area.scene);
    this.particleSystem.particleTexture = new BABYLON.Texture("src/assets/Flare.png", area.scene);
//     this.particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
    this.particleSystem.emitter = this.phys;
    this.particleSystem.start();
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function(){
        this.x-=0.01;
        this.z-=0.01;
    };
}
Duster.prototype = new Entity();

function Person(area,x,y,z){
    var meshes = [];
    meshes[0] = BABYLON.Mesh.CreateBox("box", 3, area.scene);
    meshes[0].position.x = 0;
    meshes[0].position.z = 0;
    meshes[0].position.y = 0;
    meshes[1] = BABYLON.Mesh.CreateSphere('sphere1', 16, 3, area.scene);
    meshes[0].position.x = 0;
    meshes[0].position.z = 0;
    meshes[0].position.y = 2;
    this.phys = BABYLON.Mesh.MergeMeshes(meshes,true);
//     var skeleton = new BABYLON.Skeleton("dudeSkelly",0,area.scene);
//     var bone1 = new BABYLON.Bone("bone1",skeleton,null, new BABYLONddddd.Matrix // GOTTA FIX THIS );
    
    this.phys.position.y+=10;
    this.x = x;
    this.y = y;
    this.z = z;
}
Person.prototype = new Entity();