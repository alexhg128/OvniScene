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
    camera.position.set(-4, 5, 21);
    camera.rotateY(50);
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
    sphere.position.set(-3, 8, -10)
    
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

    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('./divine_ft.jpg');
    let texture_bk = new THREE.TextureLoader().load('./divine_bk.jpg');
    let texture_up = new THREE.TextureLoader().load('./divine_up.jpg');
    let texture_dn = new THREE.TextureLoader().load('./divine_dn.jpg');
    let texture_rt = new THREE.TextureLoader().load('./divine_rt.jpg');
    let texture_lf = new THREE.TextureLoader().load('./divine_lf.jpg');
    
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
    
    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
    
    let skyboxGeo = new THREE.BoxGeometry( 300, 300, 300);
    let skybox = new THREE.Mesh( skyboxGeo, materialArray );
    skybox.position.set(0,0,0)
    scene.add( skybox );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );
    renderer.render( scene, camera );

    /*
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
    */
    
    
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

window.onload = () => {
    init();
}