import { BackSide, DoubleSide, FrontSide, Mesh, MeshBasicMaterial, MeshLambertMaterial, Object3D, Scene, TextureLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

//
// Ufo object floating in the scene.
//
class UfoObject extends SceneObject {

    // Object instance
    model: Object3D;

    // Object material
    material: MeshBasicMaterial = new MeshBasicMaterial();

    async build() {
        return new Promise<void>((resolve) => {
            //
            // Create material from texture
            //
            const texture = new TextureLoader().load('./intento.jpg');
            console.log(texture);
            const chrome = new MeshBasicMaterial({
                map: texture,
            });
            //
            // Load obj file into a Object3D instance
            //
            let loader = new OBJLoader();
            loader.load('./ovni.obj', (object: Object3D) => {
                object.traverse((child) => {
                    if(child instanceof Mesh) {
                        //
                        // Setup shadow casting for object
                        //
                        child.castShadow  = true;
                        //
                        // Setup material for mesh
                        //
                        child.material = chrome;
                        //
                        // Center the object geometry
                        //
                        child.geometry.center();
                    }
                })
                //
                // Rotate and position the object
                //
                object.position.set(0, 8, 0)
                object.scale.set(1.5, 1.5, 1.5);
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
        // Setup ufo rotation over time
        //
        if(!this.model) return;
            this.model.rotation.y = time / 2000;
    }

    addControllers(gui: ControlPanel): void {
        //
        // Add GUI controls for position and rotation
        //
        gui.addFolder("UFO(position)");
        gui.addSlider("UFO(position)", this.model.position, "x", -150, 150, 0.1);
        gui.addSlider("UFO(position)", this.model.position, "y", -150, 150, 0.1);
        gui.addSlider("UFO(position)", this.model.position, "z", -150, 150, 0.1);
        gui.addFolder("UFO(rotation)");
        gui.addSlider("UFO(rotation)", this.model.rotation, "x", 0, Math.PI * 2, 0.1);
        gui.addSlider("UFO(rotation)", this.model.rotation, "y", 0, Math.PI * 2, 0.1);
        gui.addSlider("UFO(rotation)", this.model.rotation, "z", 0, Math.PI * 2, 0.1);
    }

}

export { UfoObject };