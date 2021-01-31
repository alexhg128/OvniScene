import { Color, Mesh, MeshBasicMaterial, Object3D, Scene } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
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
        this.model.rotation.x = time / 5000;
    }

}

export { CowObject }