// import "../../entities/wave";
import { checkForResize, controls } from "../listeners/window";

export const actions = () => {
  checkForResize();
  controls.update();
};
