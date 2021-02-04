import { Scene } from "three";
import { ControlPanel } from "../gui";

/*
 * Generic abstract scene object
 */
abstract class SceneObject {
    // Interface for adding to a scene
    abstract publish(scene: Scene): SceneObject;

    // Interface for running animation
    abstract animate(time: number): void;

    // Interface for adding GUI controllers
    abstract addControllers(gui: ControlPanel): void;
}

export { SceneObject }