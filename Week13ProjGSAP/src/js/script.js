//use ctrl c to stop the program running and gain control of the console
//ThreeJS is a Y-up platform
//use f12 on website to debug
//use "npm init -y" to create package.json
//use "npm i parcel" to create node-modules - use "npm i parcel@2.7.0" if you get version error
//use "npm install three" to install threejs library
//use "npm install cannon-es" to install cannon library
//to run type "parcel ./src/index.html"

import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import gsap from 'gsap';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

//#region setup
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1,1000);
camera.position.set(0,2,2);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
scene.add(camera);

const light = new THREE.DirectionalLight( 0xFFFFFF );
light.castShadow = true;
scene.add(light);

const ambLight = new THREE.AmbientLight(0x404040, 10);
scene.add(ambLight);

const axisHelper = new THREE.AxesHelper(20);
scene.add(axisHelper);
//#endregion

//#region objects

const objURL = new URL('../../assets/batCat_Creature.gltf', import.meta.url);
const assetLoader = new GLTFLoader();
assetLoader.load(objURL.href,function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0,0,0);
},
undefined,
function(error){
    console.error(error);
}
)

const cubeGeo = new THREE.BoxGeometry(1,1,1);
const cubeMat = new THREE.MeshStandardMaterial({color:0x00ffee});
const cube = new THREE.Mesh(cubeGeo,cubeMat);
cube.position.setY(.5);
scene.add(cube);

const gridHelper = new THREE.GridHelper(20,20,{color: 0xff00ee});
scene.add(gridHelper);


//#endregion

//#region mouseStuff

// let z;
// let y;
// let x;
// const zFinal = 999;
// const yFinal = 20;
// const xFinal = 999;
const tl = gsap.timeline();
window.addEventListener("mousedown", function(e){
    // z = camera.position.z;
    // y = camera.position.y;
    // x = camera.position.x;
    
    tl.to(camera.position, {z:14, duration:1, onUpdate: function(){camera.lookAt(cube.position)}})
    .to(camera.position, {y:5, z:6, x:14, duration: 6, onUpdate: function(){
        cube.position.setX(5); camera.lookAt(0,0,0); }})
    .to(camera.position, {y: 10, duration: 3, onUpdate: function(){camera.lookAt(cube.position)}});

});

let angle = 0;
//#endregion
function animate(){

    //camera.lookAt(0,0,0);

    //#region oldCodeForRotatingCamUsingTrigStuff
    // angle += .1;
    // z = 6 * Math.sin(Math.PI * 2 * angle/360);
    // x = 6 * Math.cos(Math.PI * 2 * angle/360);
    // if(z<zFinal){
    //     camera.position.z = z;
    // }
    // if(x< xFinal){
    //     camera.position.x = x;
    // }
    // camera.lookAt(0,0,0);
    //#endregion
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function (){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})