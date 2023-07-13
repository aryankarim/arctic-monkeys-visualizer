import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { camera, renderer } from "../environment/renderer";

//__________________________________ WINDOW RESIZE _________________________________________

function resizeRendererToDisplaySize(renderer: any) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

const checkForResize = () => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.camera.updateProjectionMatrix();
  }
};

const controls = new OrbitControls(camera.camera, renderer.domElement);

controls.target.set(0, 0.5, 0);

controls.update();
controls.enablePan = false;

export const actions = () => {
  checkForResize();
  controls.update();
};
