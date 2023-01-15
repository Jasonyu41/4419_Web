var elem = document.getElementById("productModel");
// var elemWidth = elem.clientWidth;
// var elemHeight = elem.offsetHeight;
var elemWidth = window.innerWidth * 0.9;
var elemHeight = window.innerHeight * 0.9;


//three module: PerspectiveCamera, webglrenderer, PMREMGenerator
import * as THREE from './build/three.module.js';
//control
import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";
//gltf loader
import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from './examples/jsm/loaders/DRACOLoader.js';
//light
import { RoomEnvironment } from './examples/jsm/environments/RoomEnvironment.js';

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(elemWidth, elemHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

const pmremGenerator = new THREE.PMREMGenerator(renderer);
const scene = new THREE.Scene();
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, elemWidth / elemHeight, 1, 100);
camera.position.set(5, 2, 8);
//camera.lookAt(0, 0, 0);

elem.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.enablePan = false;
//controls.maxPolarAngle = Math.PI / 2;
//controls.minPolarAngle = Math.PI / 5;
controls.enableDamping = true;
controls.update();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./examples/js/libs/draco/gltf/');
let mixer;
const clock = new THREE.Clock();

var model;

let loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load("../model/Thermos_Cup.glb",
    function (glb) {
        //console.log(glb);
        model = glb.scene;
        model.position.set(1, 1, 0);
        // model.scale.set(0.02, 0.02, 0.02);
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(glb.animations[0]).play();
        animate();
        initMaterial();
    },
    function (xhr) { console.log(Math.floor(xhr.loaded / xhr.total * 100)) },
    function (error) { console.log(error); }
)

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    //console.log("TimeDelta:"+mixer.time);//elapsed animation time
    mixer.update(delta);
    controls.update();
    renderer.render(scene, camera);
};


// https://github.com/JChehe/blog/issues/44



var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);


const colors = [
    {
        texture: '../images/貼圖/1.png',
        headColor: '9ce8a5',
        size: [1, 1, 1],
        shininess: 30
    },
    {
        color: '325062',
        headColor: '485f75'
    },
    {
        color: 'F19489',
        headColor: 'fea9a9'
    },
    {
        color: 'F7c177',
        headColor: 'febc71'
    }
]
const TRAY = document.getElementById("modelTextures");

function buildColors(colors) {
    for (let [i, color] of colors.entries()) {
        let swatch = document.createElement('div');
        swatch.classList.add('modelTexture');

        if (color.texture) {
            swatch.style.backgroundImage = "url(" + color.texture + ")";
            swatch.style.backgroundSize = "cover";
        } else {
            swatch.style.background = "#" + color.color;
        }

        swatch.setAttribute('data-key', i);
        TRAY.append(swatch);
    }
}

buildColors(colors);

const swatches = document.querySelectorAll(".modelTexture");

for (const swatch of swatches) {
    swatch.addEventListener('click', selectSwatch);
}

function selectSwatch(e) {
    let color = colors[parseInt(e.target.dataset.key)];
    let new_bodyMtl;
    let new_headMtl;

    if (color.texture) {
        let txt = new THREE.TextureLoader().load(color.texture);

        txt.repeat.set(color.size[0], color.size[1], color.size[2]);
        txt.wrapS = THREE.RepeatWrapping;
        txt.wrapT = THREE.RepeatWrapping;

        new_bodyMtl = new THREE.MeshPhongMaterial({
            map: txt,
            shininess: color.shininess ? color.shininess : 30
        });
    }
    else {
        new_bodyMtl = new THREE.MeshPhongMaterial({
            color: parseInt('0x' + color.color),
            specular: parseInt("0x000000"),
            shininess: color.shininess ? color.shininess : 30
        });
    }

    new_headMtl = new THREE.MeshPhongMaterial({
        color: parseInt('0x' + color.headColor),
        specular: parseInt("0x000000"),
        shininess: color.shininess ? color.shininess : 30
    });

    setMaterial(model, new_bodyMtl, new_headMtl);
}

function setMaterial(parent, bodyMtl, headMtl) {
    parent.traverse((o) => {
        if (o.isMesh) {
            o.material = bodyMtl;
        }
    });
    parent.children[8].material = headMtl;
}


function initMaterial() {
    let color = colors[1];
    let new_bodyMtl;
    let new_headMtl;

    new_bodyMtl = new THREE.MeshPhongMaterial({
        color: parseInt('0x' + color.color),
        specular: parseInt("0x000000"),
        shininess: color.shininess ? color.shininess : 30
    });

    new_headMtl = new THREE.MeshPhongMaterial({
        color: parseInt('0x' + color.headColor),
        specular: parseInt("0x000000"),
        shininess: color.shininess ? color.shininess : 30
    });

    setMaterial(model, new_bodyMtl, new_headMtl);
}