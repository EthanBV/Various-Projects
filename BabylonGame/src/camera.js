function Camera(area,x,y,z){
    this.phys = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -15), area.scene);
    this.phys.applyGravity = true;
//     this.phys.setTarget(BABYLON.Vector3.Zero());
    this.x = 0;
    this.y = 0
    this.z = 0;
    this.xAngle = 0;
    this.yAngle = 0;
    this.zAngle = 0;
    this.update = function(){
        this.x = world.areas[world.curArea].player.x;
        this.y = world.areas[world.curArea].player.y;
        this.z = world.areas[world.curArea].player.z;
        this.xAngle = world.areas[world.curArea].player.xAngle;
        this.yAngle = world.areas[world.curArea].player.yAngle;
        this.zAngle = world.areas[world.curArea].player.zAngle;
    }
    this.updatePhys = function(){
        this.phys.position.x = this.x;
        this.phys.position.y = this.y;
        this.phys.position.z = this.z;
        this.phys.rotation.x = this.xAngle;
        this.phys.rotation.y = this.yAngle;
        this.phys.rotation.z = this.zAngle;
    }
}