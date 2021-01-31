import { Object3D, Scene } from "three";

abstract class SceneObject {
    model: Object3D;
    abstract publish(scene: Scene): SceneObject;
    abstract animate(time: number): void;
}

export { SceneObject }