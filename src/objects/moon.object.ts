import { AdditiveBlending, Color, FrontSide, IUniform, Mesh, MeshBasicMaterial, Object3D, PerspectiveCamera, Scene, ShaderMaterial, SphereGeometry, TextureLoader } from "three";
import { SceneObject } from "./object";
import vShader from '../shaders/moon.v.glsl';
import fShader from '../shaders/moon.f.glsl';
import { ControlPanel } from "../gui";

class MoonObject extends SceneObject {

    material: MeshBasicMaterial = new MeshBasicMaterial();
    color = new Color(0xFFB6C1);
    glow: Object3D;
    camera: PerspectiveCamera;

    constructor(camera: PerspectiveCamera) {
        super();
        this.camera = camera;
    }

    build() {
        const moonTexture = new TextureLoader().load('./moon.jpg');
        const moon_geometry = new SphereGeometry( 1, 32, 32 );
        const moon_mat = new MeshBasicMaterial( { map: moonTexture } );
        const sphere = new Mesh( moon_geometry, moon_mat );
        sphere.position.set(-3, 8, -10)
        this.model = sphere;

        var customMaterial = new ShaderMaterial( 
            {
                uniforms: 
                { 
                    "c":   { type: "f", value: 0.1 } as IUniform,
                    "p":   { type: "f", value: 3.1 } as IUniform,
                    glowColor: { type: "c", value: new Color(0xffffff) } as IUniform,
                    viewVector: { type: "v3", value: this.camera.position } as IUniform
                },
                vertexShader: vShader,
                fragmentShader: fShader,
                side: FrontSide,
                blending: AdditiveBlending,
                transparent: true
            }   
        );
                
        this.glow = new Mesh(moon_geometry.clone(), customMaterial.clone());
        this.glow.position.set(this.model.position.x, this.model.position.y, this.model.position.z);
        this.glow.scale.multiplyScalar(1.2);
        return this;
    }

    publish(scene: Scene) {
        scene.add(this.model);
        scene.add(this.glow);
        return this;
    }

    animate(time: number) {
        if(!this.model) return;
    }

    addControllers(gui: ControlPanel): void {
        gui.addFolder("Moon (position)");
        gui.addSlider("Moon (position)", this.model.position, "x", -150, 150, 0.1);
        gui.addSlider("Moon (position)", this.model.position, "y", -150, 150, 0.1);
        gui.addSlider("Moon (position)", this.model.position, "z", -150, 150, 0.1);
        gui.addFolder("Moon (rotation)");
        gui.addSlider("Moon (rotation)", this.model.rotation, "x", 0, Math.PI * 2, 0.1);
        gui.addSlider("Moon (rotation)", this.model.rotation, "y", 0, Math.PI * 2, 0.1);
        gui.addSlider("Moon (rotation)", this.model.rotation, "z", 0, Math.PI * 2, 0.1);
        gui.addFolder("Moon Glow (position)");
        gui.addSlider("Moon Glow (position)", this.glow.position, "x", -150, 150, 0.1);
        gui.addSlider("Moon Glow (position)", this.glow.position, "y", -150, 150, 0.1);
        gui.addSlider("Moon Glow (position)", this.glow.position, "z", -150, 150, 0.1);
        gui.addFolder("Moon Glow (rotation)");
        gui.addSlider("Moon Glow (rotation)", this.glow.rotation, "x", 0, Math.PI * 2, 0.1);
        gui.addSlider("Moon Glow (rotation)", this.glow.rotation, "y", 0, Math.PI * 2, 0.1);
        gui.addSlider("Moon Glow (rotation)", this.glow.rotation, "z", 0, Math.PI * 2, 0.1);
    }

}

export { MoonObject };