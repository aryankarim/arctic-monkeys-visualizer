import * as THREE from "three";
import { scene } from "../environment/renderer";

// //__________________________________  MAIN TUBE _________________________________________

// const sideLength = 100;
// const pathLength = 200;
// const generateSinPath = () => {
//   const pathPoints = Array.from({ length: pathLength }, (_, i) => {
//     return new THREE.Vector3(
//       i - pathLength / 2,
//       Math.sin(i - pathLength / 2) * 8 * Math.PI
//     );
//   });

//   return pathPoints;
// };

// generateSinPath();

// const curve = new THREE.SplineCurve([
//   new THREE.Vector2(-10, 0),
//   new THREE.Vector2(-5, 5),
//   new THREE.Vector2(0, 0),
//   new THREE.Vector2(5, -5),
//   new THREE.Vector2(10, 0),
// ]);

// const path = new THREE.CatmullRomCurve3(generateSinPath());
// const geometry = new THREE.TubeGeometry(path, 64, 1, 64, false);
// const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// //__________________________________ SIDE TUBES _________________________________________

// const pathStart = new THREE.CatmullRomCurve3(
//   Array.from(
//     { length: sideLength },
//     (_, i) => new THREE.Vector3(i - (sideLength + pathLength / 2), 0)
//   )
// );
// const startGeometry = new THREE.TubeGeometry(pathStart, 64, 1, 64, false);
// const startMesh = new THREE.Mesh(startGeometry, material);
// scene.add(startMesh);

// const pathEnd = new THREE.CatmullRomCurve3(
//   Array.from(
//     { length: sideLength },
//     (_, i) => new THREE.Vector3(i + pathLength / 2, 0)
//   )
// );
// const endGeometry = new THREE.TubeGeometry(pathEnd, 64, 1, 64, false);
// const endMesh = new THREE.Mesh(endGeometry, material);
// scene.add(endMesh);

// var clock = new THREE.Clock(true);

// export var n = 20,
//   boneSize = 10,
//   size = n * boneSize,
//   bones = [];

// for (var i = 0; i <= n; i++) {
//   bones[i] = new THREE.Bone();
//   if (i) bones[i - 1].add(bones[i]);
//   bones[i].position.x = i ? boneSize : -size / 2;
// }

// export let skeleton = new THREE.Skeleton(bones);

// // tapewrm skin

// var geometry = new THREE.SphereGeometry(size / 2, 60, 120, 0, Math.PI)
//     .rotateZ(Math.PI / 4)
//     .scale(1, 0.07, 0.02),
//   skinIndices = [],
//   skinWeights = [];

// var pos = geometry.getAttribute("position");
// for (var i = 0; i < pos.count; i++) {
//   var x = pos.getX(i) + size / 2,
//     bone = Math.floor(Math.min(x / boneSize, n)),
//     k = (x / boneSize) % 1;

//   var cos = Math.cos(((Math.PI * 2) / 3) * (k - 0.5));

//   if (k < 0.5) skinIndices.push(bone, Math.max(bone - 1, 0), 0, 0);
//   else skinIndices.push(bone, Math.min(bone + 1, n), 0, 0);
//   skinWeights.push(cos, 1 - cos, 0, 0);
// }

// geometry.setAttribute(
//   "skinIndex",
//   new THREE.Uint16BufferAttribute(skinIndices, 4)
// );
// geometry.setAttribute(
//   "skinWeight",
//   new THREE.Float32BufferAttribute(skinWeights, 4)
// );

// var material = new THREE.MeshPhongMaterial({
//   color: "midnightblue",
//   skinning: true,
//   flatShading: true,
//   shininess: 150,
// });
// export const tapeworm = new THREE.SkinnedMesh(geometry, material);
// tapeworm.add(skeleton.bones[0]);
// tapeworm.bind(skeleton);
// tapeworm.position.x = size / 10;

// scene.add(tapeworm);
// Step 2: Create the Sine Wave
// const numPoints = 1000; // Adjust this to control the smoothness of the wave
// const amplitude = 1;    // Adjust this to control the height of the wave
// const frequency = 3;    // Adjust this to control the number of waves

// const points = [];
// for (let i = 0; i < numPoints; i++) {
//   const x = (i / numPoints) * 4 * Math.PI; // Adjust 4 * Math.PI to control the length of the wave
//   const y = amplitude * Math.sin(frequency * x);
//   const z = 0; // Adjust this if you want to create a 3D waveform

//   points.push(new THREE.Vector3(x, y, z));
// }

// const tubeGeometry = new THREE.TubeGeometry(
//   new THREE.CatmullRomCurve3(points),
//   numPoints - 1,
//   0.04, // Adjust this to control the thickness of the tube
//   8,    // Adjust this to control the number of segments
//   false
// );

// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Adjust the color as desired

// const sineWave = new THREE.Mesh(tubeGeometry, material);
// scene.add(sineWave);
