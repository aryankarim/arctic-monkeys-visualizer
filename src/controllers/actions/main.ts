import { checkForResize, controls } from "../listeners/window";

export const actions = () => {
  checkForResize();
  controls.update();
};
