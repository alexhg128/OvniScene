import { CameraHelper, Color, Mesh, MeshBasicMaterial, Object3D, Scene, SpotLight, SpotLightHelper } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

class SpotlightObject extends SceneObject {

    model: SpotLight;
    material: MeshBasicMaterial = new MeshBasicMaterial();
    color = new Color(0xFFB6C1);

    build() {
        const light = new SpotLight();
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 4000
        this.model = light;
        this.model.angle = 0.3
        this.model.position.set(0,6.5,0);
        
        console.log(this.model);
        return this;
    }

    publish(scene: Scene) {
        scene.add(this.model);
        return this;
    }

    animate(time: number) {

    }

    addControllers(gui: ControlPanel): void {
        gui.addFolder("Spotlight (position)");
        gui.addSlider("Spotlight (position)", this.model.position, "x", -150, 150, 0.1);
        gui.addSlider("Spotlight (position)", this.model.position, "y", 0, 20, 0.1);
        gui.addSlider("Spotlight (position)", this.model.position, "z", -150, 150, 0.1);
        gui.addFolder("Spotlight (rotation)");
        gui.addSlider("Spotlight (rotation)", this.model.rotation, "x", 0, Math.PI * 2, 0.1);
        gui.addSlider("Spotlight (rotation)", this.model.rotation, "y", 0, Math.PI * 2, 0.1);
        gui.addSlider("Spotlight (rotation)", this.model.rotation, "z", 0, Math.PI * 2, 0.1);
        gui.addFolder("Spotlight");
        gui.addSlider("Spotlight", this.model, "angle", 0, Math.PI * 2, 0.1);
        gui.addSlider("Spotlight", this.model, "penumbra", 0, 1, 0.1);
    }

}

export { SpotlightObject }