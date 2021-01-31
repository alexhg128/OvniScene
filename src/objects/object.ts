import { Object3D, Scene } from "three";
import { ControlPanel } from "../gui";

abstract class SceneObject {
    model: Object3D;
    abstract publish(scene: Scene): SceneObject;
    abstract animate(time: number): void;
    abstract addControllers(gui: ControlPanel): void;
}

export { SceneObject }