import { assignLoop } from "../listeners/microphone";
import * as THREE from "three";
import { Wave } from "../../entities/wave";

export const wave = new Wave();

function calculateAverage(array: Array<number>) {
  var total = 0;

  array.forEach(function (item: number, index: number) {
    total += item;
  });

  return total || 0;
}

let inputData: Array<number> = [];

const clock = new THREE.Clock();

export const moveWaves = () => {
  const newAmplitudeIntensity = calculateAverage(inputData);

  for (let i = 0; i < wave.numPoints; i++) {
    if (
      i < Math.ceil(wave.numPoints / 4) ||
      i > Math.ceil((wave.numPoints * 3) / 4)
    ) {
      wave.points[i].x = wave.points[i].x;
      wave.points[i].y = 0;
      continue;
    }

    wave.points[i].x = (i / wave.numPoints) * 4 * Math.PI;
    wave.points[i].y =
      newAmplitudeIntensity *
      wave.amplitude *
      Math.sin(wave.frequency * wave.points[i].x);
  }

  // Recompute the tube geometry with the updated points
  wave.tubeGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(wave.points),
    wave.numPoints - 1,
    wave.radius,
    8,
    false
  );
  wave.tubeMesh.geometry.dispose(); // Clean up the previous geometry
  wave.tubeMesh.geometry = wave.tubeGeometry; // Assign the new geometry to the mesh
};

const updateAudio = (event: any) => {
  const inputBuffer = event.inputBuffer;
  inputData = inputBuffer.getChannelData(0);
};

assignLoop(updateAudio);
