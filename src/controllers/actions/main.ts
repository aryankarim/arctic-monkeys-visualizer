import { moveWaves } from "./moveWaves";

import { checkForResize, controls } from "../listeners/window";

export const actions = () => {
  moveWaves();
  checkForResize();
  controls.update();
};
