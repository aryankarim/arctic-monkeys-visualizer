// import { n, skeleton, tapeworm } from "../../entities/wave";
import { scene } from "../../environment/renderer";
import { checkForResize, controls } from "../listeners/window";
import * as THREE from "three";
var clock = new THREE.Clock(true);

let tubeGeometry, tubeMesh;
const numPoints = 1000;
const amplitude = 1;
const frequency = 3;
const points = [];

// Create the initial path for the tube geometry
for (let i = 0; i < numPoints; i++) {
  const x = (i / numPoints) * 4 * Math.PI;
  const y = amplitude * Math.sin(frequency * x);
  const z = 0;
  points.push(new THREE.Vector3(x, y, z));
}

tubeGeometry = new THREE.TubeGeometry(
  new THREE.CatmullRomCurve3(points),
  numPoints - 1,
  0.04,
  8,
  false
);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
tubeMesh = new THREE.Mesh(tubeGeometry, material);
scene.add(tubeMesh);

export const actions = () => {
  // Move the points to their new positions
  for (let i = 0; i < numPoints; i++) {
    points[i].x += 0.01; // Example: move the points along the x-axis
    points[i].y = amplitude * Math.sin(frequency * points[i].x);
  }

  // Recompute the tube geometry with the updated points
  tubeGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points),
    numPoints - 1,
    0.04,
    8,
    false
  );
  tubeMesh.geometry.dispose(); // Clean up the previous geometry
  tubeMesh.geometry = tubeGeometry; // Assign the new geometry to the mesh
  // var time = clock.getElapsedTime();
  // // tapeworm motion

  // tapeworm.rotation.z = -0.1 * Math.cos(1.9 * time);
  // tapeworm.position.y = -10.2 * Math.cos(1.9 * time);

  // for (var i = 1; i <= n; i++) {
  //   skeleton.bones[i].rotation.x = THREE.MathUtils.degToRad(
  //     i * 1 * Math.cos(0.2 * time + i * i)
  //   );
  //   skeleton.bones[i].rotation.z = THREE.MathUtils.degToRad(
  //     i * 5 * Math.sin(1.9 * time - i)
  //   );
  // }

  // skeleton.bones[0].rotation.z = THREE.MathUtils.degToRad(
  //   20 * Math.cos((1.9 / 2) * time)
  // );
  // skeleton.bones[1].rotation.z = -skeleton.bones[0].rotation.z / 2;
  // skeleton.bones[2].rotation.z = -skeleton.bones[0].rotation.z / 2;
  checkForResize();
  controls.update();
};
