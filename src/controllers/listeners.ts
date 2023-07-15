//__________________________________ AUDIO _________________________________________

import { bars, lines } from "../entities/bars";

let audioContext: any;
let mediaStream: any;
let audioSource: any;
let scriptNode: any;

function startRecording() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      audioContext = new AudioContext();
      mediaStream = stream;

      audioSource = audioContext.createMediaStreamSource(stream);

      scriptNode = audioContext.createScriptProcessor(bars, 1, 1);
      scriptNode.onaudioprocess = processAudio;

      audioSource.connect(scriptNode);
      scriptNode.connect(audioContext.destination);
    })
    .catch(function (err) {
      console.error("Error accessing microphone:", err);
    });
}

function stopRecording() {
  if (audioContext) {
    audioSource.disconnect(scriptNode);
    scriptNode.disconnect(audioContext.destination);

    mediaStream.getTracks().forEach(function (track: any) {
      track.stop();
    });
    audioContext.close();
  }
}

function processAudio(event: any) {
  const inputBuffer = event.inputBuffer;
  const inputData = inputBuffer.getChannelData(0);

  inputData.map((newNum: number, i: number) => {
    lines[i].scale.y = newNum * 200;
  });
}
(window as any).startRecording = startRecording;
(window as any).stopRecording = stopRecording;
