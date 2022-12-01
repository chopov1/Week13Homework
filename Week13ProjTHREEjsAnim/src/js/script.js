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
//scene.add(cube);

const gridHelper = new THREE.GridHelper(20,20,{color: 0xff00ee});
scene.add(gridHelper);


//#endregion

//#region mouseStuff

let z;
let y;
let x;
const zFinal = 999;
const yFinal = 999;
const xFinal = 999;
window.addEventListener("mousedown", function(e){
    z = camera.position.z;
    y = camera.position.y;
    x = camera.position.x;

});

let angle = 0;
//#endregion
function animate(){

    angle += .01;
    z = 6 * Math.sin(Math.PI * 2 * angle/360);
    x = 6 * Math.cos(Math.PI * 2 * angle/360);
    y = 8 * Math.tan(Math.PI * 2 * angle/360);
    if(z<zFinal){
        camera.position.z = z;
    }
    if(x< xFinal){
        camera.position.x = x;
    }
    if(y<yFinal){
        camera.position.y = y;
    }
    camera.lookAt(0,0,0);
   
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function (){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})