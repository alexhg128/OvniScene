import { Color, Mesh, MeshBasicMaterial, Object3D, Scene, TextureLoader, BackSide, BoxGeometry } from "three";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

class SkyboxObject extends SceneObject {

    // Object instance
    model: Object3D;

    build() {
        //
        // Import skybox textures
        //
        let materialArray = [];
        let texture_ft = new TextureLoader().load('./divine_ft.jpg');
        let texture_bk = new TextureLoader().load('./divine_bk.jpg');
        let texture_up = new TextureLoader().load('./divine_up.jpg');
        let texture_dn = new TextureLoader().load('./divine_dn.jpg');
        let texture_rt = new TextureLoader().load('./divine_rt.jpg');
        let texture_lf = new TextureLoader().load('./divine_lf.jpg');
        //
        // Create materials
        //
        materialArray.push(new MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new MeshBasicMaterial( { map: texture_lf }));
        for (let i = 0; i < 6; i++) {
            materialArray[i].side = BackSide;
        }
        //
        // Create Skybox geometry
        //
        let skyboxGeometry = new BoxGeometry(300, 300, 300);
        let skybox = new Mesh(skyboxGeometry, materialArray);
        skybox.position.set(0,0,0)
        this.model = skybox;
        this.model.receiveShadow = true;
        return this;
    }

    publish(scene: Scene) {
        //
        // Add the object to the scene
        //
        scene.add(this.model);
        return this;
    }

    animate(time: number) {
        if(!this.model) return;
    }

    addControllers(gui: ControlPanel): void {
        //
        // Add GUI controls for position and rotation
        //
        gui.addFolder("Skybox (position)");
        gui.addSlider("Skybox (position)", this.model.position, "x", -150, 150, 0.1);
        gui.addSlider("Skybox (position)", this.model.position, "y", -150, 150, 0.1);
        gui.addSlider("Skybox (position)", this.model.position, "z", -150, 150, 0.1);
        gui.addFolder("Skybox (rotation)");
        gui.addSlider("Skybox (rotation)", this.model.rotation, "x", 0, Math.PI * 2, 0.1);
        gui.addSlider("Skybox (rotation)", this.model.rotation, "y", 0, Math.PI * 2, 0.1);
        gui.addSlider("Skybox (rotation)", this.model.rotation, "z", 0, Math.PI * 2, 0.1);
    }

}

export { SkyboxObject };