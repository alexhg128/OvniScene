import { ControlPanel } from "./gui";
import { UfoScene } from "./scene/ufo.scene"

const init = () => {
    

    /*
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
    */
    
    
}

const scene = new UfoScene();
scene.createScene();
scene.createCamera();
scene.createRenderer();
scene.populate().then(() => {
    scene.render();
    const gui = new ControlPanel();
    scene.addControllers(gui);
});

window.addEventListener("resize", scene.resize, false);

var ufoAudio = new Audio("./ufo.mp3")
ufoAudio.loop = true;
ufoAudio.volume = 0.2;
var cowAudio = new Audio("./cow.wav");
cowAudio.volume = 0.15;

document.body.addEventListener("click", function () {
    //ufoAudio.play()
    //cowAudio.play();
})