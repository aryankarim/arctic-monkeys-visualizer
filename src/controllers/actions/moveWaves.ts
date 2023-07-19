import { assignLoop } from "../listeners/microphone";
import * as THREE from "three";
import { Wave } from "../../entities/wave";

const wave = new Wave();

const moveWaves = (event: any) => {
  const inputBuffer = event.inputBuffer;
  const inputData = inputBuffer.getChannelData(0);
  let random = Math.random() * 3;
  for (let i = 0; i < wave.numPoints; i++) {
    wave.points[i].x = (i / wave.numPoints) * 4 * Math.PI;
    wave.points[i].y =
      random * wave.amplitude * Math.sin(wave.frequency * wave.points[i].x);
    wave.points[i].z = 0;
  }

  // Recompute the tube geometry with the updated points
  wave.tubeGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(wave.points),
    wave.numPoints - 1,
    0.04,
    8,
    false
  );
  wave.tubeMesh.geometry.dispose(); // Clean up the previous geometry
  wave.tubeMesh.geometry = wave.tubeGeometry; // Assign the new geometry to the mesh
};

assignLoop(moveWaves);
