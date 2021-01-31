import { AmbientLight, Color, Fog, FogExp2, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { ControlPanel } from "../gui";
import { CowObject, MoonObject, SkyboxObject, UfoObject } from "../objects";
import { SceneObject } from "../objects/object";
import { supportsWebGL } from "../utils/compatibility";

class UfoScene {

    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    objects: SceneObject[] = [];
    executeAnimations = (time: number) => {
        if(this.renderer) {
            this.objects.forEach((e) => {
                e.animate(time);
            })
            this.renderer.render(this.scene, this.camera);
        }

    }

    constructor() {}

    createRenderer() {
        if(supportsWebGL()) {
            this.renderer = new WebGLRenderer( { antialias: true } );
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setAnimationLoop(this.executeAnimations);
            document.body.appendChild(this.renderer.domElement);
        } else {
            alert("Not compatible with WebGL")
        }
    }

    createScene() {
        this.scene = new Scene();
    }

    createCamera() {
        this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(-4, 5, 21);
        this.camera.rotateY(50);
    }

    render() {
        if(this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    async populate() {
        var cow = new CowObject();
        var p1 = cow.build().then(() => {
            cow.publish(this.scene);
        });
        this.objects.push(cow);
        var moon = new MoonObject(this.camera);
        moon.build().publish(this.scene);
        this.objects.push(moon);
        var skybox = new SkyboxObject();
        skybox.build().publish(this.scene);
        this.objects.push(skybox);
        var ufo = new UfoObject();
        var p2 = ufo.build().then(() => {
            ufo.publish(this.scene);
            ufo.model.visible = false;
            ufo.cube.update(this.renderer, this.scene);
            ufo.model.visible = true;
        });
        this.objects.push(ufo);
        return Promise.all([p1, p2])
    }

    resize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.render()
    }

    addControllers(gui: ControlPanel) {
            this.objects.forEach((e) => {
                e.addControllers(gui);
            });
    }

}

export { UfoScene };