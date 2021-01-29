import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer;
let geometry: THREE.BoxGeometry
let material: THREE.MeshBasicMaterial;
let mesh: THREE.Mesh;
let loader: any = new OBJLoader();
var color = new THREE.Color( 0xFFB6C1 );
var ufo: THREE.Object3D;
var cow: THREE.Object3D;

const init = () => {
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.set(-5, 0, 12);
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
	//geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	//material = new THREE.MeshNormalMaterial();
	//mesh = new THREE.Mesh( geometry, material );
    //scene.add(mesh);
    material = new THREE.MeshBasicMaterial();
    //mesh = new THREE.Mesh( object, material );

    const moon_geometry = new THREE.SphereGeometry( 1, 32, 32 );
    const moon_mat = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    const sphere = new THREE.Mesh( moon_geometry, moon_mat );
    sphere.position.set(-3, 9, -4)
    scene.add( sphere );

    loader.load(
        './cow.obj',
        (object: THREE.Object3D) => {
            object.traverse((child) => {
                
                if(child instanceof THREE.Mesh) {
                    material.color.set(color);
                    child.material = material
                    child.geometry.center();
                }
            })
            object.rotateY(90);
            scene.add(object);
            renderer.render( scene, camera );
            cow = object;
        },
        function (xhr: any) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function (error: any) {
            console.log( 'An error happened' );
        }
    )

    loader.load(
        './ufo.obj',
        (object: THREE.Object3D) => {
            object.traverse((child) => {
                
                if(child instanceof THREE.Mesh) {
                    material.color.set(color);
                    child.material = material
                    child.geometry.center();
                }
            })
            object.position.set(0, 5, 0)
            object.scale.set(1.5, 1.5, 1.5);
            object.rotateY(90);
            ufo = object;
            scene.add(ufo);
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
	renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );
    renderer.render( scene, camera );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
}

const animation = (time: number) => {
    if(ufo) {
        ufo.rotation.y = time / 2000;
    }
    if(cow) {
        cow.rotation.x = time / 5000;
    }
	renderer.render( scene, camera );
}

init();