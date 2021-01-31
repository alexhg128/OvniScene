import { Color, CylinderGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshStandardMaterial, Object3D, Scene } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

class RayObject extends SceneObject {

    model: Object3D;
    material: MeshBasicMaterial = new MeshBasicMaterial();
    color = new Color(0xFFB6C1);

    build() {
        const geometry = new CylinderGeometry( 0.6, 8, 20, 32 );
        const material = new MeshBasicMaterial( { color: 0xffff00, transparent: true, opacity: 0.1  } );
        
        const cylinder = new Mesh( geometry, material );
        this.model = cylinder;
        this.model.castShadow = true;
        this.model.receiveShadow = true;
        this.model.position.set(0,-3,0);
        return this;
    }

    publish(scene: Scene) {
        scene.add(this.model);
        console.log(this.model);
        return this;
    }

    animate(time: number) {
        if(!this.model) return;
            return;
            this.model.rotation.x = time / 5000;
    }

    addControllers(gui: ControlPanel): void {
        gui.addFolder("Ray (position)");
        gui.addSlider("Ray (position)", this.model.position, "x", -150, 150, 0.1);
        gui.addSlider("Ray (position)", this.model.position, "y", -150, 150, 0.1);
        gui.addSlider("Ray (position)", this.model.position, "z", -150, 150, 0.1);
        gui.addFolder("Ray (rotation)");
        gui.addSlider("Ray (rotation)", this.model.rotation, "x", 0, Math.PI * 2, 0.1);
        gui.addSlider("Ray (rotation)", this.model.rotation, "y", 0, Math.PI * 2, 0.1);
        gui.addSlider("Ray (rotation)", this.model.rotation, "z", 0, Math.PI * 2, 0.1);
    }

}

export { RayObject }