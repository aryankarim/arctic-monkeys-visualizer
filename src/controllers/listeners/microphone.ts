// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { bars, lines } from "../../entities/bars";

//__________________________________ AUDIO _________________________________________

let audioContext: any;
let mediaStream: any;
let audioSource: any;
let scriptNode: any;

let processAudio: Function;

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

export function assignLoop(loop: Function) {
  processAudio = loop;
}

(window as any).startRecording = startRecording;
(window as any).stopRecording = stopRecording;