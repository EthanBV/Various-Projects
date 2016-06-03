function skybox(area){
    this.phys = BABYLON.Mesh.CreateBox("skyBox", 10000.0, area.scene);
    this.skyboxMaterial = new BABYLON.StandardMaterial("skyBox", area.scene);
    this.skyboxMaterial.backFaceCulling = false;
    this.skyboxMaterial.disableLighting = true;
    this.phys.material = this.skyboxMaterial; 
    this.phys.infiniteDistance = true;
    this.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    this.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    this.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("src/assets/skybox/skybox", area.scene);
    this.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    this.update = function(){
        
    };
    this.updatePhys = function(){
        
    };
}