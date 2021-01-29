import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer;
let geometry: THREE.BoxGeometry
let material: THREE.MeshBasicMaterial;
let mesh: THREE.Mesh;
let loader: any = new OBJLoader();
var color = new THREE.Color( 0xFFB6C1 );

const init = () => {
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set(0, 10, 20);
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
	//geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	//material = new THREE.MeshNormalMaterial();
	//mesh = new THREE.Mesh( geometry, material );
    //scene.add(mesh);
    material = new THREE.MeshBasicMaterial();
    //mesh = new THREE.Mesh( object, material );

    loader.load(
        './ufo.obj',
        (object: THREE.Object3D) => {
            object.traverse((child) => {
                
                if(child instanceof THREE.Mesh) {
                    material.color.set(color);
                    child.material = material
                }
            })
            scene.add(object);
            renderer.render( scene, camera );
        },
        function (xhr: any) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function (error: any) {
            console.log( 'An error happened' );
        }
    )

    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	//renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );
    renderer.render( scene, camera );
}

const animation = (time: number) => {
	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;
	renderer.render( scene, camera );
}

init();