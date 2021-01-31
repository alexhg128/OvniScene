import { AmbientLight, Color, Fog, FogExp2, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
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
        const near = 30;
        const far = 90;
        const color = 'black';
        var light = new PointLight(0xffffff);
	light.position.set(0,100,0);
	this.scene.add(light);
        //this.scene.fog = new FogExp2(color, 0.004);
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
        cow.build().then(() => {
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
        ufo.build().then(() => {
            ufo.publish(this.scene);
            ufo.model.visible = false;
            ufo.cube.update(this.renderer, this.scene);
            ufo.model.visible = true;
        });
        this.objects.push(ufo);
    }

}

export { UfoScene };