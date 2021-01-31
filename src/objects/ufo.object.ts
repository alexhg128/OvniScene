import { type } from "superstruct";
import { Color, CubeCamera, DoubleSide, LinearMipmapLinearFilter, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, RGBFormat, Scene, TextureLoader, WebGLCubeRenderTarget } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ControlPanel } from "../gui";
import { SceneObject } from "./object";

class UfoObject extends SceneObject {

    material: MeshBasicMaterial = new MeshBasicMaterial();
    color = new Color(0xFFB6C1);
    cube: CubeCamera;

    async build() {
        return new Promise<void>((resolve, reject) => {
            const cubeRenderTarget = new WebGLCubeRenderTarget( 512, { format: RGBFormat, generateMipmaps: true, minFilter: LinearMipmapLinearFilter } );
            const texture = new TextureLoader().load('./metal.jpg');
            this.cube = new CubeCamera(0.1, 5000, cubeRenderTarget);
            const chrome = new MeshPhongMaterial({
                shininess: 100,
                color: new Color("#ffffff"),
                specular: 0xffaa00,
                reflectivity: 0.9,
                envMap: cubeRenderTarget.texture,
                map: texture
            });
            chrome.color.set("#ffffff")
            chrome.needsUpdate = true;
            let loader = new OBJLoader();
            loader.load('./ufo.obj', (object: Object3D) => {
                object.traverse((child) => {
                    if(child instanceof Mesh) {
                        child.add(this.cube)
                        this.material.color.set(this.color);

                        child.material = chrome;
                        (child.material as MeshPhongMaterial).color.set("#ffffff")                        
                        child.geometry.center();
                    }
                })
                object.position.set(0, 5, 0)
                this.cube.position.copy(object.position);
                object.scale.set(1.5, 1.5, 1.5);
                object.rotateY(90);
                this.model = object;
                resolve();

            })
        })
    }

    publish(scene: Scene) {
        scene.add(this.cube)
        scene.add(this.model);
        return this;
    }

    animate(time: number) {
        if(!this.model) return;
        this.model.rotation.y = time / 2000;
    }

    addControllers(gui: ControlPanel): void {
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