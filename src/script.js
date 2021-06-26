import { AxesHelper, BufferGeometry, PerspectiveCamera, Scene, WebGLRenderer, Points, PointsMaterial, Float32BufferAttribute, MathUtils, TextureLoader, Clock, BoxBufferGeometry, BoxGeometry, MeshBasicMaterial, Mesh, Group, LineBasicMaterial, Line } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import IMG from '../public/logoBecode.png'
import './style.css';



const textureLoader = new TextureLoader();
const beCodeLogo = textureLoader.load(IMG);

const scene = new Scene();
const distance = 6;


// const qui ns permet de definir le nombre de point "particules" voulu(e)
const count = 100;

// axe d'aide 
// scene.add(new AxesHelper());

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 
    0.01,
    1000
);
camera.position.set(.5, .5, 3);

scene.add(camera);

// boucle  pour creer un tableau avec les position

const points = new Float32Array(count * 3)
for(let i = 0 ; i<points.length; i++){
    points[i] = MathUtils.randFloatSpread(distance * 2);// permet de nous donner un entier qui sera compris entren -1 et 2 vu que la distance est de deux.
    
}
const logo = new BoxGeometry(1,1,1);
const materialLogo = new MeshBasicMaterial({
    map:,
    alphaTest: 0.5,
    transparent: true,
});
const meshLogo = new Mesh(logo,materialLogo);

scene.add(meshLogo);
// creation des points
const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
const pointMaterial = new PointsMaterial(
    {
        // color: 0xff0000,
        size: 1,
        map: beCodeLogo,
        
        alphaTest: 0.5,
        transparent: true,
        
        
    }
);
const pointsObject = new Points(geometry, pointMaterial)
const group = new Group();
group.add(pointsObject);

// const lineMaterial = new LineBasicMaterial({
//     color: 0x000000,
//     opacity: .5,
//     depthTest: false,
    
// });

// const lineObject = new Line(geometry,lineMaterial)
// group.add(lineObject)

// scene.add(group);
scene.add(pointsObject)
// creation du rendu
const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000,0);
renderer.setSize(window.innerWidth , window.innerHeight); //donne toute la taille de l ecran enlever les margin dans le css
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement); // insere le "canvas"

const controls = new OrbitControls(camera, renderer.domElement)
const clock = new Clock();

function tick(){
    //rapoort avec la const clock permet de savoir le temps ecoule relatif a la function tick
    const time = clock.getElapsedTime();
    renderer.render(scene, camera);
    controls.update();
    pointsObject.rotation.y = time * 0.1;
    meshLogo.rotation.y = time * 0.1;
    requestAnimationFrame(tick); 
}
tick();

//tcheck des redimension de la page

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
