import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.155/examples/jsm/controls/OrbitControls.js';

console.log("Three.js is successfully imported!");

// シーン、カメラ、レンダラーの設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// マウス操作用のOrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;

// 3Dオブジェクトの作成（例：正四面体）
const geometry = new THREE.TetrahedronGeometry(1);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
const tetrahedron = new THREE.Mesh(geometry, material);
scene.add(tetrahedron);
camera.position.z = 5;

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    tetrahedron.rotation.x += 0.01;
    tetrahedron.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();
