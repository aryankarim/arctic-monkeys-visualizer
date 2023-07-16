import { assignLoop } from "../controllers/listeners/microphone";

const moveBars = (event: any) => {
  const inputBuffer = event.inputBuffer;
  const inputData = inputBuffer.getChannelData(0);
  console.log(inputData);
};

assignLoop(moveBars);
