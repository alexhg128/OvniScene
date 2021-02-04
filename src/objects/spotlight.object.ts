import { Scene, SpotLight } from "three";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

//
// Spotlight light below the UFO.
//
class SpotlightObject extends SceneObject {

    // Object instance
    model: SpotLight;

    build() {
        //
        // Create lights and position it
        //
        const light = new SpotLight();
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 4000
        this.model = light;
        this.model.angle = 0.3
        this.model.position.set(0,6.5,0);
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

    }

    addControllers(gui: ControlPanel): void {
        //
        // Add GUI controls for position and rotation
        //
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