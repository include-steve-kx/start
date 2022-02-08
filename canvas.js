import './style.css'

import * as THREE from 'three';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';

let camera, cameraRef;
let cameraInitPos = [0, .95, .3];
let cameraInitLookAt = [0, 1, 1];
let scrollPercentage;

let scene, renderer;
let raycaster, mouse;

let gltfLoader;
let meshes, computer_desk, wooden_horse, duck, fire_extinguisher, telephone, train, stair_1, stair_2, stair_3;

let transformControls = [];
let orbitControl;

const bezier1 = new THREE.CubicBezierCurve3(
  new THREE.Vector3(...cameraInitPos),
  new THREE.Vector3(0, .95, .5),
  new THREE.Vector3(0, .95, .7),
  new THREE.Vector3(0, 1.2, 2),
)

const bezier2 = new THREE.CubicBezierCurve3(
  new THREE.Vector3(0, 1.2, 2),
  new THREE.Vector3(0, 0, 2),
  new THREE.Vector3(0, -5, 2),
  new THREE.Vector3(0, -10, 2),
)

const bezier3 = new THREE.CubicBezierCurve3(
  new THREE.Vector3(0, -10, 2),
  new THREE.Vector3(0, -12, 2),
  new THREE.Vector3(0, -16, 2),
  new THREE.Vector3(0, -20, 2),
)

const cameraCurves = [bezier1, bezier2, bezier3];
const scrollPercentages = [25, 85, 100];

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

  cameraRef = new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1), new THREE.MeshStandardMaterial(0x00ff00));
  // scene.add(cameraRef);
  cameraRef.position.set(...cameraInitPos);

  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.set(...cameraInitPos);
  camera.lookAt(cameraRef.position);

  // set up lights
  addPointLight(20, 20, 20, 0.5);
  addPointLight(-0.5, 1.1, 0.1, 1);
  addPointLight(0, -1, 0, 1);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // create a gltf loader
  gltfLoader = new GLTFLoader();
  meshes = new THREE.Object3D();
  scene.add(meshes);
  // add a mesh parent in the scene

  // load in computer desk model
  gltfLoader.load(
    'models/computer_desk.gltf',
    function(gltf) {
      computer_desk = gltf.scene;
      meshes.add(computer_desk);
    }
  );
  // load in wooden horse and duck model
  gltfLoader.load(
    'models/wooden_horse.gltf',
    function(gltf) {
      wooden_horse = gltf.scene;
      wooden_horse.position.set(-.8, -3, 0);
      wooden_horse.scale.set(2,2,2);
      meshes.add(wooden_horse);
    }
  );
  gltfLoader.load(
    'models/duck.gltf',
    function(gltf) {
      duck = gltf.scene;
      duck.position.set(.8, -3, 0);
      duck.scale.set(2,2,2);
      meshes.add(duck);
    }
  );
  // load in fire extinguisher and telephone
  gltfLoader.load(
    'models/fire_extinguisher.gltf',
    function(gltf) {
      fire_extinguisher = gltf.scene;
      fire_extinguisher.position.set(-.8, -5, 0);
      fire_extinguisher.scale.set(2,2,2);
      meshes.add(fire_extinguisher);
    }
  );
  gltfLoader.load(
    'models/telephone.gltf',
    function(gltf) {
      telephone = gltf.scene;
      telephone.position.set(.8, -5, 0);
      telephone.scale.set(2,2,2);
      meshes.add(telephone);
    }
  );
  // load in train
  gltfLoader.load(
    'models/train.gltf',
    function(gltf) {
      train = gltf.scene;
      train.position.y = -9;
      meshes.add(train);
    }
  );
  // load in three stairs
  gltfLoader.load(
    'models/stair_1.gltf',
    function(gltf) {
      stair_1 = gltf.scene;
      stair_1.position.set(-.8, -15, -2);
      meshes.add(stair_1);
    }
  );
  gltfLoader.load(
    'models/stair_2.gltf',
    function(gltf) {
      stair_2 = gltf.scene;
      stair_2.position.set(.2, -20, -1);
      meshes.add(stair_2);
    }
  );
  gltfLoader.load(
    'models/stair_3.gltf',
    function(gltf) {
      stair_3 = gltf.scene;
      stair_3.position.set(.8, -15, -2);
      meshes.add(stair_3);
    }
  );
  
  // set up a raycaster for mouse click events
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  renderer.domElement.addEventListener('click', onClick);

  // set up orbit control
  // addOrbitControl();

  // set up transform control
  // addTransformControl(pointLight);

  document.body.onscroll = onScroll;
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('keydown', function(key) {
    switch (key.keyCode) {
      // C - toggle orbit & transform control
      case 67:
        transformControls.forEach((control) => {
          control.showX = !control.showX;
          control.showY = !control.showY;
          control.showZ = !control.showZ;
        })
        orbitControl.enabled = !orbitControl.enabled;
        break;
      // G - translate
      case 71:
        transformControls.forEach((control) => {
          control.setMode('translate');
        })
        break;
      // E - rotate
      case 69:
        transformControls.forEach((control) => {
          control.setMode('rotate');
        })
        break;
      // S - scale
      case 83:
        transformControls.forEach((control) => {
          control.setMode('scale');
        })
        break;
      // R - reset camera
      case 82:
        camera.position.set(...cameraInitPos);
        camera.lookAt(...cameraInitLookAt);
    }
  });
}

export function onClick() {
  console.log("canvas clicked!!!");
  // mouse.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  // mouse.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  // raycaster.setFromCamera( mouse, camera );
  // let intersects = raycaster.intersectObjects(scene.children, true);
  // console.log(intersects);
}


function addOrbitControl() {
  orbitControl = new OrbitControls(camera, renderer.domElement);
  orbitControl.update();
  orbitControl.addEventListener('change', onControlChange);
}

function addTransformControl(object) {
  let transformControl = new TransformControls(camera, renderer.domElement);
  transformControl.addEventListener('change', onControlChange);
  transformControl.addEventListener('dragging-changed', function (e) {
    orbitControl.enabled = !e.value;
  });
  transformControl.addEventListener('mouseUp', function () {
    console.log(object.position);
  });
  transformControl.attach(object);
  scene.add(transformControl);
  transformControls.push(transformControl);
}

function addPointLight(x=0, y=0, z=0, intensity=1) {
  const pointLight = new THREE.PointLight(0xffffff, intensity);
  pointLight.position.set(x, y, z);
  scene.add(pointLight);
  const lightHelper = new THREE.PointLightHelper(pointLight, 0.1);
  scene.add(lightHelper);
}

/**
 * 
 * @param {array} cameraCurves an array of bezier curves to animate the camera along
 * @param {array} scrollPercentages anarray of scroll percentages, i-th scroll percentage corresponds to
 * i-th bezier curve, signifying the scroll bar percentage before animating the camera along the next bezier curve
 */
function moveCamera(cameraCurves, scrollPercentages) {
  let i = binarySearch(scrollPercentages, scrollPercentage);
  let curvePercentage;
  if (i === 0) {
    curvePercentage = scrollPercentage/scrollPercentages[0];
  } else if (i === scrollPercentages.length) {
    i = scrollPercentages.length - 1;
    curvePercentage = 1;
  } else {
    curvePercentage = (scrollPercentage-scrollPercentages[i-1])/(scrollPercentages[i]-scrollPercentages[i-1]);
  }
  let pos = cameraCurves[i].getPointAt(curvePercentage);
  camera.position.set(...pos);
}

function moveCameraRef(cameraRefCurves, scrollPercentages) {
  let i = binarySearch(scrollPercentages, scrollPercentage);
  let curvePercentage;
  if (i === 0) {
    curvePercentage = scrollPercentage/scrollPercentages[0];
  } else if (i === scrollPercentages.length) {
    i = scrollPercentages.length - 1;
    curvePercentage = 1;
  } else {
    curvePercentage = (scrollPercentage-scrollPercentages[i-1])/(scrollPercentages[i]-scrollPercentages[i-1]);
  }
  let pos = cameraRefCurves[i].getPointAt(curvePercentage);
  cameraRef.position.set(...pos);
}

function binarySearch(arr, val) {
  let min = 0;
  let max = arr.length - 1;
  while (min <= max) {
    let mid = Math.floor(min + (max - min) / 2);
    if (arr[mid] === val) {
      return mid + 1;
    } else if (arr[mid] > val) {
      max = mid - 1;
    } else {
      min = mid + 1;
    }
  }
  return max + 1;
}

init();
animate();

window.onload = function() {
  
}

function updateTrainPosition(percentage) {
  let startZ = -150;
  let endZ = 30;
  let curZ = startZ + (endZ - startZ) * percentage / 100;
  console.log(curZ)
  train.position.z = curZ;
}

function updateStairTransform() {
  stair_1.rotation.y -= 0.01;
  stair_2.rotation.y -= 0.01;
  stair_3.rotation.y -= 0.02;
}

function onScroll() {
  scrollPercentage = get_scroll_percentage();
  moveCamera(cameraCurves, scrollPercentages);
  // moveCameraRef(cameraRefCurves, scrollPercentages);
  // camera.lookAt(cameraRef.position);
  // as scrolling, move the train from far away to near camera
  updateTrainPosition(scrollPercentage);
  updateStairTransform();
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  onControlChange();
}

function updateMeshTransform() {
  wooden_horse.rotation.y -= 0.01;
  duck.rotation.y -= 0.01;
  fire_extinguisher.rotation.y -= 0.01;
  telephone.rotation.y -= 0.01;
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  updateMeshTransform();
}

// callback function for orbit/transform control events
function onControlChange() {
  renderer.render(scene, camera);
}