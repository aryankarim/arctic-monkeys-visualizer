import * as THREE from "three";
import { scene } from "../environment/renderer";

export const bars = 256;

const boxes = new Array(bars).fill(new THREE.BoxGeometry(1, 1, 1));

export const lines = boxes.map((box, i) => {
  const depthMesh = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

  const mesh = new THREE.Mesh(box, depthMesh);

  mesh.position.x = -(bars / 2) + i;

  mesh.scale.y = 1;
  mesh.rotateX(0);
  scene.add(mesh);
  return mesh;
});
