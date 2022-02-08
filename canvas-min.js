import './style.css'

import * as THREE from 'three';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

let camera;
let cameraInitPos = [0, .95, .3];
let cameraInitLookAt = [0, 1, 1];
let scrollPercentage;

let scene, renderer;

const bezier1 = new THREE.CubicBezierCurve3(
  new THREE.Vector3(...cameraInitPos),
  new THREE.Vector3(0, .95, .5),
  new THREE.Vector3(0, .95, .7),
  new THREE.Vector3(0, 1.2, 2),
)

const bezier2 = new THREE.CubicBezierCurve3(
  new THREE.Vector3(0, 1.5, 2),
  new THREE.Vector3(0, 1.2, 1),
  new THREE.Vector3(0, .5, 1),
  new THREE.Vector3(0, 0, 1),
)

const cameraCurves = [bezier1, bezier2];
const scrollPercentages = [50, 100];

window.onbeforeunload = function() {
  window.scrollTo(0,0);
};

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const aspect = window.innerWidth / window.innerHeight;

  scene = new THREE.Scene();

  const cameraRef = new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshBasicMaterial(0xffffff));
  scene.add(cameraRef);
  cameraRef.position.set(...cameraInitPos);

  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.set(...cameraInitPos);
  camera.lookAt(cameraRef.position);

  // set up lights
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(20,20,20);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  // set up helpers
  const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper, gridHelper);

  // create a gltf loader
  let gltfLoader = new GLTFLoader();

  // load in computer desk model
  gltfLoader.load(
    'models/computer_desk.gltf',
    function(gltf) {
      let mesh = gltf.scene;
      scene.add(mesh);
    }
  )
  
  document.body.onscroll = onScroll;
  window.addEventListener('resize', onWindowResize);
}

/**
 * 
 * @param {array} cameraCurves an array of bezier curves to animate the camera along
 * @param {array} scrollPercentages anarray of scroll percentages, i-th scroll percentage corresponds to
 * i-th bezier curve, signifying the scroll bar percentage before animating the camera along the next bezier curve
 */
function moveCamera(cameraCurves, scrollPercentages) {
  let i = binarySearch(scrollPercentages, scrollPercentage);
  let curvePercentage=(i==0?(scrollPercentage/scrollPercentages[0]):((scrollPercentage-scrollPercentages[i-1])/(scrollPercentages[i]-scrollPercentages[i-1])));
  let pos = cameraCurves[i].getPoint(curvePercentage);
  camera.position.set(...pos);
}

function binarySearch(arr, val) {
  let min = 0;
  let max = arr.length - 1;
  while (min <= max) {
    let mid = Math.floor(min + (max - min) / 2);
    if (arr[mid] == val) {
      return mid + 1;
    } else if (arr[mid] > val) {
      max = mid - 1;
    } else {
      min = mid + 1;
    }
  }
  return max + 1;
}

window.onload = function() {
  
}

function onScroll() {
  scrollPercentage = get_scroll_percentage();
  moveCamera(cameraCurves, scrollPercentages);
  camera.position.y -= 0.002;
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

init();
render();