import { ControlPanel } from "./gui";
import { UfoScene } from "./scene/ufo.scene"

//
// Application main loop
//

//
// Setup renderer, scene and camera
//
const scene = new UfoScene();
scene.createScene();
scene.createCamera();
scene.createRenderer();
//
// Create all the scene objects, add them, and render them
//
scene.populate().then(() => {
    scene.render();
    //
    // Create control panel and create controls
    //
    
    const gui = new ControlPanel();
    scene.addControllers(gui);
});

//
// Setup resize event listener for adjusting canvas
//
window.addEventListener("resize", scene.resize, false);

//
// Import and setup audio play after user interaction
//
var ufoAudio = new Audio("./ufo.mp3")
ufoAudio.loop = true;
ufoAudio.volume = 0.2;
var cowAudio = new Audio("./cow.wav");
cowAudio.volume = 0.15;
document.body.addEventListener("click", function () {
    // Uncomment for audio play
    //ufoAudio.play()
    //cowAudio.play();
})