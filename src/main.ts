import "./style/main.css";
import { scene, camera, renderer } from "./environment/renderer";
import "./environment/paint";
import { actions } from "./controllers/actions/main";

let render = function () {
  actions();
  renderer.render(scene, camera.camera);
  requestAnimationFrame(render);
};
requestAnimationFrame(render);
