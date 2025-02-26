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

// 8つの正四面体の配置
const tetrahedrons = [];
const positions = [
    [-2,  2,  2], [ 2,  2,  2], [-2, -2,  2], [ 2, -2,  2],
    [-2,  2, -2], [ 2,  2, -2], [-2, -2, -2], [ 2, -2, -2]
];

// 心理機能ごとの色の設定
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

// 色のブレンド関数
function blendColors(color1, color2, factor) {
    let r = (1 - factor) * (color1 >> 16 & 255) + factor * (color2 >> 16 & 255);
    let g = (1 - factor) * (color1 >> 8 & 255) + factor * (color2 >> 8 & 255);
    let b = (1 - factor) * (color1 & 255) + factor * (color2 & 255);
    return (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b);
}

// 統合の強度（磁力）の適用
let integrationStrength = 0.02;

function applyMagneticForce() {
    for (let i = 0; i < tetrahedrons.length; i++) {
        for (let j = i + 1; j < tetrahedrons.length; j++) {
            let t1 = tetrahedrons[i];
            let t2 = tetrahedrons[j];

            let direction = new THREE.Vector3().subVectors(t2.position, t1.position);
            let distance = direction.length();

            if (distance > 0.5) { // 一定の距離より離れていたら引き寄せる
                direction.normalize();
                t1.position.addScaledVector(direction, integrationStrength);
                t2.position.addScaledVector(direction.negate(), integrationStrength);

                // 色の統合
                let factor = 1 - Math.min(distance / 5, 1); // 距離が近いほど色を合成
                let blendedColor = blendColors(colors[i], colors[j], factor);
                t1.material.color.setHex(blendedColor);
                t2.material.color.setHex(blendedColor);
            }
        }
    }
}

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    applyMagneticForce(); // 磁力（引力）の適用
    controls.update(); // マウス操作の更新
    renderer.render(scene, camera);
}

animate();

