import { AmbientLight, Color, Fog, FogExp2, HemisphereLight, Mesh, MeshBasicMaterial, MeshPhongMaterial, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, PointLight, Scene, ShadowMaterial, TextureLoader, WebGLRenderer } from "three";
import { ControlPanel } from "../gui";
import { CowObject, MoonObject, SkyboxObject, UfoObject } from "../objects";
import { SceneObject } from "../objects/object";
import { RayObject } from "../objects/ray.object";
import { SpotlightObject } from "../objects/spotlight.object";
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
            this.renderer.shadowMap.enabled = true
            this.renderer.shadowMap.type = PCFSoftShadowMap
            var scene_color = 0x000000;
var scene_color_alpha = 1;
this.renderer.setClearColor(scene_color, scene_color_alpha);
this.renderer.sortObjects = false;
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
        });
        this.objects.push(ufo);
        var spotlight = new SpotlightObject();
        spotlight.build().publish(this.scene);
        
        const planeGeometry: PlaneGeometry = new PlaneGeometry(10, 10)
const plane: THREE.Mesh = new Mesh(planeGeometry, new ShadowMaterial({ opacity: 1 }))

plane.rotateX(-Math.PI / 2)
plane.position.y = -4
plane.receiveShadow = true;
plane.castShadow = true;
this.scene.add(plane);

const planeGeometry2: PlaneGeometry = new PlaneGeometry(300, 300)
let text = new TextureLoader().load('./dirt.jpeg');
const plane2: THREE.Mesh = new Mesh(planeGeometry2, new MeshBasicMaterial({ map: text }))

plane2.rotateX(-Math.PI / 2)
plane2.position.y = -5
this.scene.add(plane2)
var ray = new RayObject();
        ray.build().publish(this.scene);
        this.objects.push(ray);
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
            gui.addFolder("Camera (position)");
            gui.addSlider("Camera (position)", this.camera.position, "x", -20, 20, 0.1);
            gui.addSlider("Camera (position)", this.camera.position, "y", -20, 20, 0.1);
            gui.addSlider("Camera (position)", this.camera.position, "z", -50, 50, 0.1);
            gui.addFolder("Camera (rotation)");
            gui.addSlider("Camera (rotation)", this.camera.rotation, "x", 0, Math.PI * 2, 0.1);
            gui.addSlider("Camera (rotation)", this.camera.rotation, "y", 0, Math.PI * 2, 0.1);
            gui.addSlider("Camera (rotation)", this.camera.rotation, "z", 0, Math.PI * 2, 0.1);
    }

}

export { UfoScene };