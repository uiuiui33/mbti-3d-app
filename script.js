import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.min.js';

console.log("Three.js is successfully imported!");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TetrahedronGeometry(1);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
const tetrahedron = new THREE.Mesh(geometry, material);
scene.add(tetrahedron);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    tetrahedron.rotation.x += 0.01;
    tetrahedron.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
