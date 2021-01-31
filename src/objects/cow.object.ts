import { Color, Mesh, MeshBasicMaterial, Object3D, Scene } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

class CowObject extends SceneObject {

    material: MeshBasicMaterial = new MeshBasicMaterial();
    color = new Color(0xFFB6C1);

    async build() {
        return new Promise<void>((resolve, reject) => {
            let loader = new OBJLoader();
            loader.load('./cow.obj', (object: Object3D) => {
                object.traverse((child) => {
                    if(child instanceof Mesh) {
                        this.material.color.set(this.color);
                        child.material = this.material
                        child.geometry.center();
                    }
                })
                object.rotateY(90);
                this.model = object;
                resolve();
            })
            
        })
    }

    publish(scene: Scene) {
        scene.add(this.model);
        return this;
    }

    animate(time: number) {
        if(!this.model) return;
            return;
            this.model.rotation.x = time / 5000;
    }

    addControllers(gui: ControlPanel): void {
        gui.addFolder("Cow (position)");
        gui.addSlider("Cow (position)", this.model.position, "x", -150, 150, 0.1);
        gui.addSlider("Cow (position)", this.model.position, "y", -150, 150, 0.1);
        gui.addSlider("Cow (position)", this.model.position, "z", -150, 150, 0.1);
        gui.addFolder("Cow (rotation)");
        gui.addSlider("Cow (rotation)", this.model.rotation, "x", 0, Math.PI * 2, 0.1);
        gui.addSlider("Cow (rotation)", this.model.rotation, "y", 0, Math.PI * 2, 0.1);
        gui.addSlider("Cow (rotation)", this.model.rotation, "z", 0, Math.PI * 2, 0.1);
    }

}

export { CowObject }