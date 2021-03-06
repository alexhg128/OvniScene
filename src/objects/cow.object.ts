import { FrontSide, Mesh, MeshBasicMaterial, Object3D, Scene, TextureLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

//
// Cow object floating in the scene.
//
class CowObject extends SceneObject {

    // Object instance
    model: Object3D;

    async build() {
        return new Promise<void>((resolve, _reject) => {
            //
            // Texture loading and material creation
            //
            const texture = new TextureLoader().load('./cow.png');
            const mat = new MeshBasicMaterial({
                map: texture,
                side: FrontSide
            });
            //
            // Load obj file into a Object3D instance
            //
            let loader = new OBJLoader();
            loader.load('./vaca.obj', (object: Object3D) => {
                object.traverse((child) => {
                    //
                    // Setup material for mesh
                    //
                    if(child instanceof Mesh) {
                        child.material = mat;
                        //
                        // Setup shadow casting for object
                        //
                        child.castShadow = true;
                        child.receiveShadow = true;
                        //
                        // Center the object geometry
                        //
                        child.geometry.center();
                    }
                })
                //
                // Rotate the object
                //
                object.rotateY(90);
                this.model = object;
                resolve();
            })
            
        })
    }

    publish(scene: Scene) {
        //
        // Add the object to the scene
        //
        scene.add(this.model);
        return this;
    }

    animate(time: number) {
        //
        // Setup cow rotation over time
        //
        if(!this.model) return;
            this.model.rotation.x = time / 5000;
    }

    addControllers(gui: ControlPanel): void {
        //
        // Add GUI controls for position and rotation
        //
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