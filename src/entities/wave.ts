import * as THREE from "three";
import { camera, scene } from "../environment/renderer";
import "../controllers/listeners/microphone";

export class Wave {
  tubeGeometry: any;
  tubeMesh: any;
  numPoints = 1000;
  amplitude = 1;
  frequency = 1;
  radius = 0.1;
  points: any = [];

  constructor() {
    for (let i = 0; i < this.numPoints; i++) {
      const x = (i / this.numPoints) * 4 * Math.PI;
      const y = this.amplitude * Math.sin(this.frequency * x);
      this.points.push(new THREE.Vector3(x, y));
    }
    this.tubeGeometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(this.points),
      this.numPoints - 1,
      this.radius,
      8,
      false
    );

    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    this.tubeMesh = new THREE.Mesh(this.tubeGeometry, material);

    scene.add(this.tubeMesh);
  }
}
