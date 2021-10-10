import './style.css';

import * as THREE from 'three';
import {MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#scene')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene,camera);

// adding cubes
const colors=[0x00ff00,0xff0000,0x0000ff,0xffff00,0xff00ff,0x00ffff];
const cubes=[],octahedrons=[];
colors.forEach(value=>{
  cubes.push(createCube(value));
  octahedrons.push(createOctahedron(value));
});

// add lights
const pointLight=new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const directionalLight=new THREE.DirectionalLight(0xffffff,1);
scene.add(pointLight,directionalLight);

const pointLightHelper=new THREE.PointLightHelper(pointLight);
const dirLightHelper=new THREE.DirectionalLightHelper(directionalLight);
const gridHelper=new THREE.GridHelper(200,50);
const axesHelper=new THREE.AxesHelper(5);
const cameraHelper=new THREE.CameraHelper(camera);
scene.add(pointLightHelper,dirLightHelper,gridHelper,axesHelper,cameraHelper);

// enable controls
const orbit=new OrbitControls(camera,renderer.domElement);

function createCube(color){
  const geometry=new THREE.BoxGeometry();
  const material=new THREE.MeshPhongMaterial({color:color});
  const cube=new THREE.Mesh(geometry,material);

  const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(10));
  cube.position.set(x,y,z);

  scene.add(cube);

  return cube;
}

function createOctahedron(color){
  const geometry=new THREE.OctahedronGeometry();
  const material=new THREE.MeshPhongMaterial({color:color});
  const octahedron=new THREE.Mesh(geometry,material);

  const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(15));
  octahedron.position.set(x,y,z);

  scene.add(octahedron);

  return octahedron;
}

function animate(){
  requestAnimationFrame(animate);

  cubes.forEach(cube=>{
    cube.rotateX(0.01);
    cube.rotateY(0.01);
    cube.rotateZ(0.001);
  });

  octahedrons.forEach(octahedron=>{
    octahedron.rotateY(-0.01);
  })

  orbit.update();
  renderer.render(scene,camera);
}

animate();