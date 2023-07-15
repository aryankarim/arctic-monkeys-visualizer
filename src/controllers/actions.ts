import { checkForResize, controls } from "./listeners";

export const actions = () => {
  checkForResize();
  controls.update();
};
