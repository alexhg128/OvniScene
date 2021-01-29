self["webpackHotUpdateOvniScene"](0,[
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var THREE = __importStar(__webpack_require__(1));
var OBJLoader_1 = __webpack_require__(2);
var OrbitControls_1 = __webpack_require__(3);
var camera;
var scene;
var renderer;
var geometry;
var material;
var mesh;
var loader = new OBJLoader_1.OBJLoader();
var color = new THREE.Color(0xFFB6C1);
var ufo;
var cow;
var init = function () {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(-5, 0, 12);
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    //geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    //material = new THREE.MeshNormalMaterial();
    //mesh = new THREE.Mesh( geometry, material );
    //scene.add(mesh);
    material = new THREE.MeshBasicMaterial();
    //mesh = new THREE.Mesh( object, material );
    var moon_geometry = new THREE.SphereGeometry(1, 32, 32);
    var moon_mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sphere = new THREE.Mesh(moon_geometry, moon_mat);
    sphere.position.set(-3, 9, -4);
    scene.add(sphere);
    loader.load('./cow.obj', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                material.color.set(color);
                child.material = material;
                child.geometry.center();
            }
        });
        object.rotateY(90);
        scene.add(object);
        renderer.render(scene, camera);
        cow = object;
    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
        console.log('An error happened');
    });
    loader.load('./ufo.obj', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                material.color.set(color);
                child.material = material;
                child.geometry.center();
            }
        });
        object.position.set(0, 5, 0);
        object.scale.set(1.5, 1.5, 1.5);
        object.rotateY(90);
        ufo = object;
        scene.add(ufo);
        renderer.render(scene, camera);
    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function (error) {
        console.log('An error happened');
    });
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
};
var animation = function (time) {
    if (ufo) {
        ufo.rotation.y = time / 2000;
    }
    if (cow) {
        cow.rotation.x = time / 5000;
    }
    renderer.render(scene, camera);
};
init();


/***/ })
]);