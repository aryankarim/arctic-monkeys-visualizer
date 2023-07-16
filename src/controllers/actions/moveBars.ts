import { lines } from "../../entities/bars";
import { assignLoop } from "../listeners/microphone";

const moveBars = (event: any) => {
  const inputBuffer = event.inputBuffer;
  const inputData = inputBuffer.getChannelData(0);
  inputData.map((newNum: number, i: number) => {
    lines[i].scale.y = newNum * 200;
  });
};

assignLoop(moveBars);
