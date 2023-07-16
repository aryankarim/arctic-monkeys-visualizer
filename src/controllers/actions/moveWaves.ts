import { assignLoop } from "../listeners/microphone";

const moveWaves = (event: any) => {
  const inputBuffer = event.inputBuffer;
  const inputData = inputBuffer.getChannelData(0);
  console.log(inputData);
};

assignLoop(moveWaves);
