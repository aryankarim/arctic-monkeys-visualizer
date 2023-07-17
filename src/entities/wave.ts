import * as THREE from "three";
import { scene } from "../environment/renderer";

//__________________________________  MAIN TUBE _________________________________________

const sideLength = 500;
const pathLength = 200;
const generateSinPath = () => {
  const pathPoints = Array.from({ length: pathLength }, (_, i) => {
    return new THREE.Vector3(
      i - pathLength / 2,
      Math.sin(i - pathLength / 2) * 8 * Math.PI
    );
  });

  return pathPoints;
};

generateSinPath();

const path = new THREE.CatmullRomCurve3(generateSinPath());
const geometry = new THREE.TubeGeometry(path, 64, 1, 64, false);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//__________________________________ SIDE TUBES _________________________________________

const pathStart = new THREE.CatmullRomCurve3(
  Array.from(
    { length: sideLength },
    (_, i) => new THREE.Vector3(i - (sideLength + pathLength / 2), 0)
  )
);
const startGeometry = new THREE.TubeGeometry(pathStart, 64, 1, 64, false);
const startMesh = new THREE.Mesh(startGeometry, material);
scene.add(startMesh);

const pathEnd = new THREE.CatmullRomCurve3(
  Array.from(
    { length: sideLength },
    (_, i) => new THREE.Vector3(i + pathLength / 2, 0)
  )
);
const endGeometry = new THREE.TubeGeometry(pathEnd, 64, 1, 64, false);
const endMesh = new THREE.Mesh(endGeometry, material);
scene.add(endMesh);
