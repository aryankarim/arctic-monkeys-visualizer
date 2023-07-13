import * as THREE from "three";

export class Camera {
  camera: THREE.PerspectiveCamera;
  speed = 0.05;
  direction = "s";
  fov = 40;
  aspect = 2;
  near = 0.1;
  far = 1000;

  constructor() {
    const camera = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
    camera.position.set(20, 0, 300);

    this.camera = camera;
  }
}
