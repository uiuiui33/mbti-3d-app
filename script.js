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

// 8つの正四面体を追加
const tetrahedrons = [];
const positions = [
    [-2,  2,  2], [ 2,  2,  2], [-2, -2,  2], [ 2, -2,  2],
    [-2,  2, -2], [ 2,  2, -2], [-2, -2, -2], [ 2, -2, -2]
];

const colors = [
    0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 
    0xff00ff, 0x00ffff, 0xff8800, 0x8888ff
];

for (let i = 0; i < 8; i++) {
    const geometry = new THREE.TetrahedronGeometry(1);
    const material = new THREE.MeshBasicMaterial({ color: colors[i], wireframe: true });
    const tetrahedron = new THREE.Mesh(geometry, material);
    tetrahedron.position.set(...positions[i]);
    scene.add(tetrahedron);
    tetrahedrons.push(tetrahedron);
}

// カメラの初期位置
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
