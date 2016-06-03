function getArea(index){
    switch(index){
        case 1:
            var newArea = new area();
            newArea.scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
            newArea.cam = new Camera(newArea,0,0,0);
            var player = new Player(newArea);
            newArea.addEntity(player);
            newArea.player = player;
            for(k = 0; k < 100; k++){
//                 var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, newArea.scene);
//                 sphere.position.y = Math.random()*10;
//                 sphere.position.x = 5-Math.random()*10;
//                 sphere.position.z = 5-Math.random()*10;
                var sphere = new Sphere(newArea,50-Math.random()*100,Math.random()*100,50-Math.random()*100,2);
                newArea.addEntity(sphere);
            }
            newArea.addEntity(new Box(newArea,50-Math.random()*100,Math.random()*100,50-Math.random()*100,3));
            var emitter = new Duster(newArea, 50,50,50,1);
            newArea.addEntity(emitter);
            newArea.skybox = new skybox(newArea);
            
            var person = new Person(newArea,0,0,0);
//             newArea.addEntity(person);
            
            
//             var floorMat = new BABYLON.StandardMaterial(null, newArea.scene);
//             floorMat.diffuseTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/grass.png", newArea.scene);
//             floorMat.diffuseTexture.uScale = 50.0;
//             floorMat.diffuseTexture.vScale = 50.0;
//             var ground = BABYLON.Mesh.CreateGround('ground1', 600, 600, 2, newArea.scene);
//             ground.material = floorMat;
//             ground.receiveShadows = true;
//             newArea.addFloor(ground);
//             
            var groundMaterial = new BABYLON.StandardMaterial("ground", newArea.scene);
            groundMaterial.diffuseTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/grass.png", newArea.scene);
            groundMaterial.diffuseTexture.uScale = 50.0;
            groundMaterial.diffuseTexture.vScale = 50.0;
            var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "src/assets/heightMapRoad.png", 2000, 2000, 250, 0, 100, newArea.scene, false, true);
            ground.material = groundMaterial;
            newArea.addFloor(ground);
            
            var light = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(-1, -1, 0), newArea.scene);
//             var light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), newArea.scene);
            light.diffuse = new BABYLON.Color3(1, 1, 1);
            light.darkness = new BABYLON.Color3(0, 1, 1);
            light.specular = new BABYLON.Color3(0, 0, 0);
            newArea.addLight(light);
            
            return newArea;
    }
}