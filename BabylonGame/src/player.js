function Player(area){
    this.phys = BABYLON.Mesh.CreateSphere('player', 16, 10, area.scene);
    this.y = 10;
    
    this.move = function(left, right, down, up) {
        var vel = 0.1;
        var forwards = 0;
        var sideways = 0;
        if(left) sideways++;
        if(right) sideways--;
        if(down) forwards--;
        if(up) forwards++;
        if(sideways !== 0 || forwards !== 0) {
            var angle = Math.atan2(forwards, sideways) - this.yAngle;
            this.dz -= Math.sin(angle) * vel;
            this.dx -= Math.cos(angle) * vel;
        }
    },
        
        
    this.update = function(){
        this.move(keys[65], keys[68], keys[87], keys[83]);
        this.x +=this.dx;
        this.y +=this.dy;
        this.z +=this.dz;
        if(mouseDx != 0){
            this.yAngle += mouseDx/1000;
            mouseDx = 0;
            if(this.yAngle > Math.PI)this.yAngle-=Math.PI*2;
            if(this.yAngle < -Math.PI)this.yAngle+=Math.PI*2;
        }
        if(mouseDy != 0){
            this.xAngle += mouseDy/1000;
            console.log(Math.sign(mouseDy));
            mouseDy = 0;
            if(this.xAngle > Math.PI/2-0.1)this.xAngle = Math.PI/2-0.1;
            if(this.xAngle < -Math.PI/2+0.1)this.xAngle = -Math.PI/2+0.1;
        }
        if(keys[32])this.y++;
        var angle = Math.atan2(this.dz, this.dx);
        var vel = Math.sqrt(this.dz * this.dz + this.dx * this.dx);
        vel *= 0.85;
        this.dz = Math.sin(angle) * vel;
        this.dx = Math.cos(angle) * vel;
        if(Math.abs(this.dx) < 0.01) this.dx = 0;
        if(Math.abs(this.dz) < 0.01) this.dz = 0;
    };
}

Player.prototype = new Entity();

j