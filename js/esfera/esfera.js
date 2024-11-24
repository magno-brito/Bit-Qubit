const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(700, 500);  // Definindo o tamanho fixo do renderizador
document.getElementById('bloch-sphere-container').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Criação da esfera (Bloch Sphere)
const sphereGeometry = new THREE.SphereGeometry(1, 25, 25);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xBF40BF, wireframe: true });
const blochSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
blochSphere.scale.set(2, 2, 2);  // A escala da esfera permanece fixa
scene.add(blochSphere);

// Criação do vetor do qubit
const vectorMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 3 });
const vectorGeometry = new THREE.BufferGeometry();
const radius = blochSphere.scale.x;
const positions = new Float32Array([0, 0, 0, 0, 0, radius]);  // Vetor começando na posição 0 no eixo Z
vectorGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const qubitVector = new THREE.Line(vectorGeometry, vectorMaterial);
scene.add(qubitVector);

// Criação do "tip" do qubit (esfera pequena)
const tipGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const tipMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const qubitTip = new THREE.Mesh(tipGeometry, tipMaterial);
qubitTip.position.set(0, 0, radius);  // Iniciar no ponto inicial do vetor
scene.add(qubitTip);

// Adicionando os eixos X, Y, Z (com as linhas para os eixos negativos)
const axesHelper = new THREE.AxesHelper(1.5);
axesHelper.scale.set(3, 3, 3);
scene.add(axesHelper);

// Desenhando os eixos negativos manualmente
const axisMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const negativeXGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-3, 0, 0)
]);
const negativeXLine = new THREE.Line(negativeXGeometry, axisMaterial);
scene.add(negativeXLine);

const negativeYGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -3, 0)
]);
const negativeYLine = new THREE.Line(negativeYGeometry, axisMaterial);
scene.add(negativeYLine);

const negativeZGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -3)
]);
const negativeZLine = new THREE.Line(negativeZGeometry, axisMaterial);
scene.add(negativeZLine);

// Função para criar textos fixos
function createTextMesh(text, position, color) {
    const loader = new THREE.FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/three@0.137.5/examples/fonts/helvetiker_regular.typeface.json', function(font) {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 0.2,
            height: 0.01,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: color });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.copy(position);
        scene.add(textMesh);
    });
}

createTextMesh('|0>', new THREE.Vector3(0, 0, 3), 0x000000);  // |0> no eixo Z positivo com ajuste
createTextMesh('|1>', new THREE.Vector3(0, 0, -3.0), 0x000000); // |1> no eixo Z negativo
createTextMesh('X', new THREE.Vector3(2.2, 0, 0), 0xff0000);  // Ajuste no eixo Z
createTextMesh('Y', new THREE.Vector3(0, 2.2, 0), 0x00ff00);  // Ajuste no eixo Z
createTextMesh('Z', new THREE.Vector3(0, 0, 2.5), 0x0000ff);

// Inicialização dos ângulos theta e phi
let theta = Math.PI / 2;
let phi = 0;

// Função para atualizar o vetor do qubit
function updateQubitVector(theta, phi) {
    const radius = blochSphere.scale.x;
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    const positions = qubitVector.geometry.attributes.position.array;
    positions[3] = x;
    positions[4] = y;
    positions[5] = z;
    qubitVector.geometry.attributes.position.needsUpdate = true;

    qubitTip.position.set(x, y, z);
    document.getElementById('theta-value').innerText = (theta / Math.PI).toFixed(2) + 'π';
    document.getElementById('phi-value').innerText = (phi / Math.PI).toFixed(2) + 'π';
}

// Função para animação contínua
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Função para animação interpolada
function animateQubitVector(targetTheta, targetPhi, duration = 1000) {
    const startTheta = theta;
    const startPhi = phi;
    const startTime = performance.now();

    function step() {
        const elapsedTime = performance.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        theta = startTheta + (targetTheta - startTheta) * progress;
        phi = startPhi + (targetPhi - startPhi) * progress;

        updateQubitVector(theta, phi);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    step();
}

// Funções para aplicar portas lógicas
function applyPauliX() {
    const targetTheta = theta === 0 ? Math.PI : 0;
    animateQubitVector(targetTheta, phi);
}

function applyPauliY() {
    const targetTheta = Math.PI - theta;
    const targetPhi = phi + Math.PI / 2;
    animateQubitVector(targetTheta, targetPhi);
}

function applyPauliZ() {
    const targetPhi = phi + Math.PI;
    animateQubitVector(theta, targetPhi);
}

function applyHadamard() {
    const targetTheta = Math.PI / 2;
    const targetPhi = phi + Math.PI / 4;
    animateQubitVector(targetTheta, targetPhi);
}

function applyIdentity() {
    // Sem mudanças, apenas mantém o vetor no estado atual
    animateQubitVector(theta, phi);
}

// Função para resetar o qubit ao estado |0⟩
function resetQubit() {
    const targetTheta = 0; // Vetor apontando para |0⟩ no eixo Z
    const targetPhi = 0;   // Sem rotação lateral
    animateQubitVector(targetTheta, targetPhi); // Animação para o estado inicial
}

// Ajustando a função de redimensionamento da janela
window.addEventListener('resize', function() {
    const width = 700;  // Largura fixa para o canvas
    const height = 500; // Altura fixa para o canvas
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
